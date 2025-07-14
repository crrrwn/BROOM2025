// Barcode generation and validation utilities
import { supabase } from "@/lib/supabase"

export const generateOrderBarcode = (orderId) => {
  // Generate a simple barcode format: BROOM + timestamp + orderId
  const timestamp = Date.now().toString().slice(-6)
  const paddedOrderId = orderId.toString().padStart(4, "0")
  return `BROOM${timestamp}${paddedOrderId}`
}

export const validateBarcode = (barcode) => {
  // Validate barcode format
  const pattern = /^BROOM\d{6}\d{4}$/
  return pattern.test(barcode)
}

export const extractOrderIdFromBarcode = (barcode) => {
  if (!validateBarcode(barcode)) {
    throw new Error("Invalid barcode format")
  }

  // Extract the numeric part after 'BROOM'
  return Number.parseInt(barcode.substring(5, 9), 10)
}

export const generateBarcodeImage = (barcode, options = {}) => {
  const {
    width = 200,
    height = 50,
    fontSize = 12,
    showText = true,
    backgroundColor = "#ffffff",
    foregroundColor = "#000000",
  } = options

  // Create canvas element
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = width
  canvas.height = height

  // Fill background
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, width, height)

  // Generate barcode pattern (Code 128 simplified)
  const barcodePattern = generateBarcodePattern(barcode)

  // Draw barcode bars
  ctx.fillStyle = foregroundColor
  const barWidth = (width - 40) / barcodePattern.length
  const barHeight = showText ? height - 20 : height - 10

  barcodePattern.forEach((bar, index) => {
    if (bar === "1") {
      const x = 20 + index * barWidth
      ctx.fillRect(x, 5, barWidth, barHeight)
    }
  })

  // Draw text if enabled
  if (showText) {
    ctx.fillStyle = foregroundColor
    ctx.font = `${fontSize}px monospace`
    ctx.textAlign = "center"
    ctx.fillText(barcode, width / 2, height - 5)
  }

  return canvas.toDataURL("image/png")
}

const generateBarcodePattern = (barcode) => {
  // Simplified barcode pattern generation
  // In a real implementation, you'd use proper Code 128 encoding
  const patterns = {
    B: "11010010000",
    R: "11010000100",
    O: "11001101100",
    M: "11001100110",
    0: "10010011000",
    1: "10010001100",
    2: "10001001100",
    3: "10011001000",
    4: "10011000100",
    5: "10001100100",
    6: "11001001000",
    7: "11001000100",
    8: "10010000100",
    9: "10001001000",
  }

  let pattern = "11010010000" // Start pattern

  for (const char of barcode) {
    pattern += patterns[char] || patterns["0"]
  }

  pattern += "1100011101011" // Stop pattern

  return pattern
}

export const createBarcodeElement = (barcode, containerId, options = {}) => {
  const container = document.getElementById(containerId)
  if (!container) {
    throw new Error(`Container with ID '${containerId}' not found`)
  }

  const img = document.createElement("img")
  img.src = generateBarcodeImage(barcode, options)
  img.alt = `Barcode: ${barcode}`
  img.style.maxWidth = "100%"
  img.style.height = "auto"

  container.innerHTML = ""
  container.appendChild(img)

  return img
}

export const downloadBarcodeImage = (barcode, filename, options = {}) => {
  const imageDataUrl = generateBarcodeImage(barcode, options)

  const link = document.createElement("a")
  link.download = filename || `barcode-${barcode}.png`
  link.href = imageDataUrl

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const printOrderBarcode = (barcode, options = {}) => {
  const imageDataUrl = generateBarcodeImage(barcode, {
    ...options,
    width: 400,
    height: 100,
  })

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

const drawFinderPattern = (ctx, x, y, moduleSize) => {
  // Draw 7x7 finder pattern
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      if (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
        ctx.fillRect(x + i * moduleSize, y + j * moduleSize, moduleSize, moduleSize)
      }
    }
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

export const generateBarcode = (data) => {
  return new Promise((resolve, reject) => {
    try {
      // Create canvas element
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      // Set canvas dimensions
      canvas.width = 300
      canvas.height = 100

      // Fill white background
      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Generate simple barcode pattern
      const barcodeData = `ORDER-${data}`
      const barWidth = 2
      const barHeight = 60
      const startX = 20
      const startY = 20

      // Create barcode pattern based on data
      ctx.fillStyle = "black"
      for (let i = 0; i < barcodeData.length; i++) {
        const charCode = barcodeData.charCodeAt(i)
        const pattern = charCode % 8 // Simple pattern generation

        for (let j = 0; j < 8; j++) {
          if ((pattern >> j) & 1) {
            const x = startX + (i * 8 + j) * barWidth
            ctx.fillRect(x, startY, barWidth, barHeight)
          }
        }
      }

      // Add text below barcode
      ctx.fillStyle = "black"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(barcodeData, canvas.width / 2, startY + barHeight + 20)

      // Convert to data URL
      const dataURL = canvas.toDataURL("image/png")
      resolve(dataURL)
    } catch (error) {
      // Fallback SVG barcode
      const svgBarcode = `
        <svg width="300" height="100" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="100" fill="white"/>
          <g fill="black">
            <rect x="20" y="20" width="2" height="60"/>
            <rect x="25" y="20" width="1" height="60"/>
            <rect x="30" y="20" width="3" height="60"/>
            <rect x="37" y="20" width="1" height="60"/>
            <rect x="42" y="20" width="2" height="60"/>
            <rect x="48" y="20" width="1" height="60"/>
            <rect x="53" y="20" width="4" height="60"/>
            <rect x="61" y="20" width="1" height="60"/>
            <rect x="66" y="20" width="2" height="60"/>
            <rect x="72" y="20" width="1" height="60"/>
            <rect x="77" y="20" width="3" height="60"/>
            <rect x="84" y="20" width="1" height="60"/>
            <rect x="89" y="20" width="2" height="60"/>
            <rect x="95" y="20" width="1" height="60"/>
            <rect x="100" y="20" width="3" height="60"/>
            <rect x="107" y="20" width="2" height="60"/>
          </g>
          <text x="150" y="95" text-anchor="middle" font-family="Arial" font-size="12">ORDER-${data}</text>
        </svg>
      `

      const blob = new Blob([svgBarcode], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      resolve(url)
    }
  })
}

export const downloadBarcode = (barcodeData, filename) => {
  const link = document.createElement("a")
  link.download = filename
  link.href = barcodeData
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
