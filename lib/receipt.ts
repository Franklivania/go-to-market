import { formatNaira } from "@/lib/formart-naira";

export type ReceiptLineItem = {
  name: string;
  quantity: number;
  unit: string;
  price: number;
};

export type ReceiptList = {
  id: string;
  title: string;
  items: ReceiptLineItem[];
  total: number;
};

export type ReceiptData = {
  issuedBy: string;
  logoBase64?: string | null;
  receiptNumber: string;
  purchasedAt: Date;
  lists: ReceiptList[];
  grandTotal: number;
};

function buildHtml(data: ReceiptData): string {
  const { issuedBy, logoBase64, receiptNumber, purchasedAt, lists, grandTotal } = data;
  const dateStr = `${purchasedAt.toDateString()} ${purchasedAt.toLocaleTimeString()}`;

  const listsHtml = lists
    .map((l) => {
      const itemsHtml = l.items
        .map(
          (it) => `
            <tr>
              <td style="padding:6px 0;">${it.name}</td>
              <td style="padding:6px 0; text-align:center;">${it.quantity} ${it.unit}</td>
              <td style="padding:6px 0; text-align:right;">${formatNaira(it.price || 0)}</td>
            </tr>`
        )
        .join("");
      return `
        <div style="margin-top:16px;">
          <div style="font-weight:600; margin-bottom:6px;">${l.title}</div>
          <table style="width:100%; border-collapse:collapse;">
            <thead>
              <tr>
                <th style="text-align:left; padding:6px 0; border-bottom:1px solid #eee;">Item</th>
                <th style="text-align:center; padding:6px 0; border-bottom:1px solid #eee;">Qty</th>
                <th style="text-align:right; padding:6px 0; border-bottom:1px solid #eee;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr>
                <td></td>
                <td style="padding-top:8px; text-align:right; font-weight:600;">Subtotal</td>
                <td style="padding-top:8px; text-align:right; font-weight:600;">${formatNaira(l.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>`;
    })
    .join("");

  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', 'Karla', sans-serif; padding: 16px; color: #111; }
          .card { max-width: 720px; margin: 0 auto; }
          .brand { display:flex; align-items:center; gap:10px; }
          .logo { width:28px; height:28px; border-radius:6px; }
          .muted { color:#666; }
          .divider { height:1px; background:#eee; margin:12px 0; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="brand">
            ${logoBase64 ? `<img class="logo" src="data:image/png;base64,${logoBase64}" />` : ""}
            <div style="font-size:18px; font-weight:700;">${issuedBy}</div>
          </div>
          <div class="muted" style="margin-top:6px;">Receipt No: ${receiptNumber}</div>
          <div class="muted">Date: ${dateStr}</div>
          <div class="divider"></div>

          ${listsHtml}

          <div class="divider"></div>
          <div style="display:flex; justify-content:flex-end; gap:12px;">
            <div style="font-weight:700;">Total:</div>
            <div style="font-weight:700;">${formatNaira(grandTotal)}</div>
          </div>

          <div class="muted" style="margin-top:16px; text-align:center;">Thank you for shopping with ${issuedBy}.</div>
        </div>
      </body>
    </html>
  `;
}

export async function printAndShareReceipt(data: ReceiptData): Promise<void> {
  const html = buildHtml(data);

  const Print = await import("expo-print");
  const { uri } = await Print.printToFileAsync({ html });

  // Share if available
  try {
    const Sharing = await import("expo-sharing");
    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(uri);
      return;
    }
  } catch {
    // best-effort; ignore if sharing is not available
  }
}

export async function tryLoadLogoBase64(): Promise<string | null> {
  try {
    const AssetModule = await import("expo-asset");
    const FileSystem = await import("expo-file-system");
    const asset = AssetModule.Asset.fromModule(require("../assets/logo.png"));
    await asset.downloadAsync();
    if (!asset.localUri) return null;
    const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch {
    return null;
  }
}
