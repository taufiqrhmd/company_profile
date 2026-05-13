interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "archived";
  created_at: string;
}

export const useInquiries = () => {
  // Tentukan tipe data array dari Inquiry
  const messages = ref<Inquiry[]>([]);
  const loading = ref<boolean>(false);

  const fetchMessages = async (statusFilter: string = "All") => {
    loading.value = true;
    try {
      // Menentukan tipe kembalian data dari fetch
      const data = await $fetch<Inquiry[]>("/api/inquiries", {
        params: { status: statusFilter },
      });
      messages.value = data || [];
    } catch (e) {
      console.error("Fetch Error:", e);
    } finally {
      loading.value = false;
    }
  };

  const updateStatus = async (id: string, status: Inquiry["status"]) => {
    try {
      // Debug: Cek apakah ID yang dikirim adalah string UUID yang benar
      console.log("Mengirim update untuk ID:", id);

      await $fetch("/api/inquiries/update", {
        method: "POST",
        body: {
          id, // Ini harus string seperti '550e8400-e29b-41d4-a716-446655440000'
          status,
        },
      });

      // Update state lokal agar UI berubah seketika
      const msg = messages.value.find((m) => m.id === id);
      if (msg) msg.status = status;
    } catch (e) {
      console.error("Update Error:", e);
    }
  };

  const deleteMessage = async (id: string) => {
  try {
    await $fetch("/api/inquiries/delete", {
      method: "DELETE",
      body: { id },
    });
    // Update state lokal
    messages.value = messages.value.filter((msg) => msg.id !== id);
    return { success: true };
  } catch (e) {
    console.error("Delete Error:", e);
    return { success: false };
  }
};

  return { messages, loading, fetchMessages, updateStatus, deleteMessage };
};
