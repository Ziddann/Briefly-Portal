const BASE_URL = "http://localhost:5000/api";

export const useCommentAction = (newsId, userId) => {
  const reactToComment = async (commentId, action, refetch) => {
    try {
      const res = await fetch(`${BASE_URL}/comments/${commentId}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });
      const data = await res.json();
      if (data.success && refetch) refetch();
    } catch (err) {
      console.error("Gagal memberikan reaksi komentar:", err);
    }
  };

  const submitReply = async (parentId, replyText, refetch) => {
    try {
      const res = await fetch(`${BASE_URL}/comments/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          newsId,
          parentId,
          commentText: replyText,
        }),
      });
      const data = await res.json();
      if (data.success && refetch) refetch();
    } catch (err) {
      console.error("Gagal mengirim balasan:", err);
    }
  };

  return {
    reactToComment,
    submitReply,
  };
};
