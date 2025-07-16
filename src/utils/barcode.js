import JsBarcode from "jsbarcode"
import { supabase } from "@/lib/supabase" // Corrected import path

/**
 * Generates a barcode value from an order ID.
 * Uses a custom BROOM format with timestamp and padded orderId.
 * @param {string|number} orderId
 * @returns {string} The barcode value.
 */
export const generateOrderBarcode = (orderId) => {
  const timestamp = Date.now().toString().slice(-6)
  const paddedOrderId = orderId.toString().padStart(4, "0")
  return `BROOM${timestamp}${paddedOrderId}`
}

/**
 * Validates the custom BROOM barcode format.
 * @param {string} barcode
 * @returns {boolean} True if the barcode matches the format, false otherwise.
 */
export const validateBarcode = (barcode) => {
  const pattern = /^BROOM\d{6}\d{4}$/
  return pattern.test(barcode)
}

/**
 * Extracts the order ID from a custom BROOM barcode.
 * @param {string} barcode
 * @returns {number} The extracted order ID.
 * @throws {Error} If the barcode format is invalid.
 */
export const extractOrderIdFromBarcode = (barcode) => {
  if (!validateBarcode(barcode)) {
    throw new Error("Invalid barcode format")
  }
  // Extract the numeric part after 'BROOM' (first 4 digits after BROOM)
  return Number.parseInt(barcode.substring(5, 9), 10)
}

/**
 * Generates a barcode image (SVG) and appends it to a specified DOM element.
 * Provides a fallback SVG if JsBarcode fails or barcodeValue is invalid.
 * @param {string} barcodeValue The value to encode in the barcode.
 * @param {string} elementId The ID of the DOM element to append the barcode to.
 * @param {object} options JsBarcode options.
 */
export function createBarcodeElement(barcodeValue, elementId, options = {}) {
  const element = document.getElementById(elementId)
  if (!element) {
    console.error(`[barcode.js] Target element with ID "${elementId}" not found.`)
    return
  }

  // Clear previous content
  element.innerHTML = ""

  if (!barcodeValue || typeof barcodeValue !== "string" || barcodeValue.trim() === "") {
    console.error(`[barcode.js] Invalid barcode value provided: "${barcodeValue}"`)
    // Display a simple error message as SVG fallback
    const errorSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    errorSvg.setAttribute("width", options.width || "250")
    errorSvg.setAttribute("height", options.height || "80")
    errorSvg.setAttribute("viewBox", `0 0 ${options.width || 250} ${options.height || 80}`)
    errorSvg.innerHTML = `
      <rect x="0" y="0" width="100%" height="100%" fill="#f8d7da" stroke="#dc3545" stroke-width="2"/>
      <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="14" fill="#dc3545">
        Error generating barcode
      </text>
      <text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="12" fill="#dc3545">
        Value: ${barcodeValue || "N/A"}
      </text>
    `
    element.appendChild(errorSvg)
    return
  }

  try {
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    // Set width to 100% to make it responsive to its container
    svgElement.setAttribute("width", "100%")
    svgElement.setAttribute("height", options.height || "80") // Maintain aspect ratio or fixed height

    JsBarcode(svgElement, barcodeValue, {
      format: "CODE128", // Use Code 128 for alphanumeric data
      displayValue: options.showText !== false, // Default to true
      width: options.barWidth || 2, // Width of a single bar (default 2px)
      height: options.height || 80, // Height of the barcode (default 80px)
      textMargin: options.textMargin || 5,
      fontSize: options.fontSize || 16,
      background: options.backgroundColor || "#f3f4f6", // bg-gray-100
      lineColor: options.foregroundColor || "#1f2937", // text-gray-900
      margin: options.margin || 10, // Overall margin around the barcode
      xmlDocument: document, // Important for SVG rendering in some environments
    })
    element.appendChild(svgElement)
    console.log(`[barcode.js] Barcode successfully rendered to SVG for value: "${barcodeValue}"`)
  } catch (error) {
    console.error(`[barcode.js] Failed to render barcode to SVG for value "${barcodeValue}":`, error)
    // Fallback to a simpler error message if JsBarcode itself fails
    const errorSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    errorSvg.setAttribute("width", options.width || "250")
    errorSvg.setAttribute("height", options.height || "80")
    errorSvg.setAttribute("viewBox", `0 0 ${options.width || 250} ${options.height || 80}`)
    errorSvg.innerHTML = `
      <rect x="0" y="0" width="100%" height="100%" fill="#f8d7da" stroke="#dc3545" stroke-width="2"/>
      <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="14" fill="#dc3545">
        Rendering Failed
      </text>
      <text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="12" fill="#dc3545">
        Value: ${barcodeValue || "N/A"}
      </text>
    `
    element.appendChild(errorSvg)
  }
}

/**
 * Downloads the barcode image as a PNG.
 * @param {string} barcodeValue The value encoded in the barcode.
 * @param {string} filename The desired filename for the downloaded image.
 * @param {object} options JsBarcode options.
 */
export const downloadBarcodeImage = (barcodeValue, filename = "barcode.png", options = {}) => {
  const canvas = document.createElement("canvas")
  JsBarcode(canvas, barcodeValue, {
    format: "CODE128",
    displayValue: options.showText !== false,
    width: options.barWidth || 2,
    height: options.height || 80,
    textMargin: options.textMargin || 5,
    fontSize: options.fontSize || 16,
    background: options.backgroundColor || "#f3f4f6",
    lineColor: options.foregroundColor || "#1f2937",
    margin: options.margin || 10,
    ...options,
  })

  const link = document.createElement("a")
  link.download = filename
  link.href = canvas.toDataURL("image/png")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Prints the order barcode.
 * @param {string} barcode The barcode value to print.
 * @param {object} options JsBarcode options.
 */
export const printOrderBarcode = (barcode, options = {}) => {
  const canvas = document.createElement("canvas")
  JsBarcode(canvas, barcode, {
    format: "CODE128",
    displayValue: true,
    width: 2, // Default bar width for print
    height: 100, // Default height for print
    textMargin: 5,
    fontSize: 18,
    background: "#ffffff",
    lineColor: "#000000",
    margin: 20,
    ...options,
  })

  const imageDataUrl = canvas.toDataURL("image/png")

  const printWindow = window.open("", "_blank")
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Barcode - ${barcode}</title>
        <style>
          body {
            margin: 0;
            padding: 20px;
            text-align: center;
            font-family: Arial, sans-serif;
          }
          .barcode-container {
            page-break-inside: avoid;
            margin: 20px 0;
          }
          .barcode-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .barcode-subtitle {
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="barcode-container">
          <div class="barcode-title">QuickServe Order Barcode</div>
          <div class="barcode-subtitle">Order ID: ${extractOrderIdFromBarcode(barcode)}</div>
          <img src="${imageDataUrl}" alt="Barcode: ${barcode}" />
          <div style="margin-top: 20px; font-size: 12px;">
            Show this barcode to your delivery driver
          </div>
        </div>
        <div class="no-print" style="margin-top: 30px;">
          <button onclick="window.print()">Print</button>
          <button onclick="window.close()">Close</button>
        </div>
      </body>
    </html>
  `)

  printWindow.document.close()
  printWindow.focus()
}

// The following functions are not directly related to barcode image generation
// but are kept as they might be used elsewhere in the application.

export const scanBarcode = async () => {
  // This would integrate with a barcode scanning library like QuaggaJS
  // For now, we'll return a promise that resolves with a mock scan
  return new Promise((resolve, reject) => {
    // Mock barcode scanning
    setTimeout(() => {
      // In a real implementation, this would use camera API
      const mockBarcode = "BROOM0123456789"
      resolve(mockBarcode)
    }, 2000)
  })
}

export const validateScannedBarcode = async (scannedBarcode) => {
  try {
    if (!validateBarcode(scannedBarcode)) {
      throw new Error("Invalid barcode format")
    }

    const orderId = extractOrderIdFromBarcode(scannedBarcode)

    // Verify the order exists in the database
    const { data, error } = await supabase.from("orders").select("id, status, user_id").eq("id", orderId).single()

    if (error || !data) {
      throw new Error("Order not found")
    }

    return {
      valid: true,
      orderId: data.id,
      orderStatus: data.status,
      userId: data.user_id,
    }
  } catch (error) {
    return {
      valid: false,
      error: error.message,
    }
  }
}

export const generateQRCode = async (orderId, orderData) => {
  try {
    const barcode = generateOrderBarcode(orderId)
    const qrData = {
      barcode,
      orderId,
      service: orderData.service_type,
      amount: orderData.total_amount,
      timestamp: new Date().toISOString(),
    }

    return {
      barcode,
      qrData: JSON.stringify(qrData),
    }
  } catch (error) {
    console.error("Error generating QR code:", error)
    return null
  }
}

export const createOrderQRCode = (orderId, userInfo) => {
  const qrData = JSON.stringify({
    type: "quickserve_order",
    orderId,
    barcode: generateOrderBarcode(orderId),
    timestamp: new Date().toISOString(),
    userInfo: {
      name: userInfo.name,
      contact: userInfo.contact,
    },
  })

  return generateQRCode(orderId, qrData)
}

export const getBarcodeInfo = (barcode) => {
  if (!validateBarcode(barcode)) {
    return null
  }

  const orderId = Number.parseInt(barcode.slice(5, 9))
  const timestamp = barcode.slice(9)

  return {
    orderId,
    timestamp,
    generatedAt: new Date(Number.parseInt(timestamp + "000")),
  }
}
