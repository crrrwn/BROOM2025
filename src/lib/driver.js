import { supabase } from "./supabase.js"

// Function to upload a file to Supabase Storage
export async function uploadFileToSupabaseStorage(file, folderPath) {
  try {
    const fileName = `${Date.now()}-${file.name}`
    const filePath = `${folderPath}/${fileName}`

    const { data, error } = await supabase.storage
      .from("driver_documents") // Use the bucket name you created
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

    if (error) {
      console.error("Supabase Storage upload error:", error)
      throw new Error(`Failed to upload file: ${error.message}`)
    }

    // Get the public URL of the uploaded file
    const { data: publicUrlData } = supabase.storage.from("driver_documents").getPublicUrl(filePath)

    if (!publicUrlData || !publicUrlData.publicUrl) {
      throw new Error("Failed to get public URL for uploaded file.")
    }

    return publicUrlData.publicUrl
  } catch (error) {
    console.error("Error in uploadFileToSupabaseStorage:", error)
    throw error
  }
}

// Register a new driver and upload documents
export async function registerDriver(driverData, files) {
  try {
    console.log("Starting driver registration...")

    // 1. Insert the driver application data first
    const { data: applicationData, error: insertError } = await supabase
      .from("driver_applications")
      .insert([
        {
          first_name: driverData.firstName,
          last_name: driverData.lastName,
          middle_name: driverData.middleName || null,
          suffix: driverData.suffix || null,
          gender: driverData.gender,
          phone: driverData.contact,
          email: driverData.email,
          password_hash: driverData.password, // Changed from 'password' to 'password_hash'
          house_street_address: driverData.houseStreetAddress,
          barangay: driverData.barangay,
          license_number: driverData.licenseNumber,
          license_expiry_date: driverData.licenseExpiryDate,
          date_of_birth: driverData.dateOfBirth,
          license_type: driverData.licenseType,
          motorcycle_brand: driverData.motorcycleBrand,
          motorcycle_model: driverData.motorcycleModel,
          motorcycle_plate: driverData.motorcyclePlate,
          motorcycle_year: Number.parseInt(driverData.motorcycleYear),
          experience: driverData.experience,
          status: "pending",
        },
      ])
      .select("id") // Select the ID of the newly created application
      .single()

    if (insertError) {
      console.error("Database insert error:", insertError)
      throw new Error("Failed to submit application: " + insertError.message)
    }

    const applicationId = applicationData.id
    console.log("Driver application created successfully with ID:", applicationId)

    // 2. Upload files and insert their URLs into driver_documents table
    const documentUploadPromises = Object.keys(files).map(async (fileType) => {
      const file = files[fileType]
      if (file) {
        const folderPath = `applications/${applicationId}` // Organize files by application ID
        const fileUrl = await uploadFileToSupabaseStorage(file, folderPath)

        const { error: docInsertError } = await supabase.from("driver_documents").insert([
          {
            application_id: applicationId,
            document_type: fileType,
            file_url: fileUrl,
          },
        ])

        if (docInsertError) {
          console.error(`Error inserting document ${fileType} URL:`, docInsertError)
          throw new Error(`Failed to save document ${fileType} URL: ${docInsertError.message}`)
        }
        console.log(`Document ${fileType} uploaded and URL saved: ${fileUrl}`)
      }
    })

    await Promise.all(documentUploadPromises)

    return { success: true, applicationId }
  } catch (error) {
    console.error("Driver registration error:", error)
    throw error
  }
}

// Login driver
export async function loginDriver(email, password) {
  try {
    const { data, error } = await supabase
      .from("driver_applications")
      .select("*")
      .eq("email", email)
      .eq("password_hash", password) // Changed from 'password' to 'password_hash'
      .single()

    if (error) {
      console.error("Supabase login error:", error)
      throw new Error(`Login failed: ${error.message}`)
    }

    if (!data) {
      throw new Error("Invalid credentials or application not found.")
    }

    if (data.status !== "approved") {
      throw new Error("Your application is not yet approved. Please wait for admin review.")
    }

    // In a real app, you'd set a session or JWT here
    localStorage.setItem("driverSession", JSON.stringify(data))
    return { success: true, driver: data }
  } catch (error) {
    console.error("Error in loginDriver:", error)
    throw error
  }
}

// Get current driver
export function getCurrentDriver() {
  const session = localStorage.getItem("driverSession")
  return session ? JSON.parse(session) : null
}

// Logout driver
export function logoutDriver() {
  localStorage.removeItem("driverSession")
}

// Check if driver is authenticated
export function isDriverAuthenticated() {
  return getCurrentDriver() !== null
}

// Get available bookings
export async function getAvailableBookings() {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(`*,
        users (
          first_name,
          last_name,
          email,
          phone
        ),
        services (
          name,
          base_price
        )
      `)
      .eq("status", "pending")
      .is("driver_id", null)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching available bookings:", error)
    throw error
  }
}

// Accept a booking
export async function acceptBooking(orderId, driverId) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .update({
        driver_id: driverId,
        status: "accepted",
        accepted_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error accepting booking:", error)
    throw error
  }
}

// Get driver assignments
export async function getDriverAssignments(driverId) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(`*,
        users (
          first_name,
          last_name,
          email,
          phone
        ),
        services (
          name,
          base_price
        )
      `)
      .eq("driver_id", driverId)
      .in("status", ["accepted", "in_progress", "completed"])
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching driver assignments:", error)
    throw error
  }
}

// Update order status
export async function updateOrderStatus(orderId, status) {
  try {
    const updates = {
      status: status,
      updated_at: new Date().toISOString(),
    }

    if (status === "in_progress") {
      updates.started_at = new Date().toISOString()
    } else if (status === "completed") {
      updates.completed_at = new Date().toISOString()
    }

    const { data, error } = await supabase.from("orders").update(updates).eq("id", orderId).select().single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error updating order status:", error)
    throw error
  }
}

// Get driver statistics
export async function getDriverStats(driverId) {
  try {
    const { data, error } = await supabase.from("orders").select("status, total_amount").eq("driver_id", driverId)

    if (error) throw error

    const stats = {
      totalDeliveries: data.length,
      completed: data.filter((order) => order.status === "completed").length,
      inProgress: data.filter((order) => order.status === "in_progress").length,
      totalEarnings: data
        .filter((order) => order.status === "completed")
        .reduce((sum, order) => sum + (order.total_amount || 0), 0),
    }

    return stats
  } catch (error) {
    console.error("Error fetching driver stats:", error)
    throw error
  }
}
