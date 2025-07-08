import React, { useEffect, useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import "./Styles/ActionButton.css"

function ActionButtons({ newsId, userId, comments, setComments }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyInputs, setReplyInputs] = useState({});
  const emojiPickerRef = useRef();

  const BASE_URL = "http://localhost:5000/api";

  useEffect(() => {
    if (!userId || !newsId) return;

    const fetchStatus = async () => {
      try {
        const [likeRes, bookmarkRes] = await Promise.all([
          fetch(`${BASE_URL}/news/${newsId}/liked/${userId}`).then(res => res.json()),
          fetch(`${BASE_URL}/news/${newsId}/bookmarked/${userId}`).then(res => res.json()),
        ]);
        setIsLiked(likeRes.liked);
        setIsBookmarked(bookmarkRes.bookmarked);
      } catch (err) {
        console.error("Gagal fetch status like/bookmark:", err);
      }
    };

    const fetchLikeCount = async () => {
      try {
        const res = await fetch(`${BASE_URL}/news/${newsId}`);
        const data = await res.json();
        setLikeCount(data.likes || 0);
      } catch (err) {
        console.error("Gagal fetch jumlah like:", err);
      }
    };

    fetchStatus();
    fetchLikeCount();
  }, [newsId, userId]);

  const refetchComments = async () => {
    try {
      const res = await fetch(`${BASE_URL}/comments/${newsId}`);
      const data = await res.json();
      console.log(data);
      if (Array.isArray(data)) {
        setComments(data);
      }
    } catch (err) {
      console.error("Gagal refetch komentar:", err);
    }
  };

  const handleLike = async () => {
    try {
      const res = await fetch(`${BASE_URL}/news/${newsId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.success) {
        setIsLiked(data.liked);
        setLikeCount(data.likes);
      }
    } catch (err) {
      console.error("Gagal toggle like:", err);
    }
  };

  const handleBookmark = async () => {
    try {
      const res = await fetch(`${BASE_URL}/news/${newsId}/bookmark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.success) {
        setIsBookmarked(data.bookmarked);
      }
    } catch (err) {
      console.error("Gagal toggle bookmark:", err);
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(prev => !prev);
  };

  const handleEmojiSelect = (emojiData) => {
    const emoji = emojiData.emoji;
    alert(`Emoji dipilih: ${emoji}`);
  };

  const onReactComment = async (commentId, action) => {
    try {
      const res = await fetch(`${BASE_URL}/comments/${commentId}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });
      const data = await res.json();
      if (data.success) {
        refetchComments();
      }
    } catch (err) {
      console.error("Gagal reaksi komentar:", err);
    }
  };

  const toggleReplyInput = (commentId) => {
    setReplyInputs((prev) => ({
      ...prev,
      [commentId]: prev[commentId] !== undefined ? undefined : "",
    }));
  };

  const handleReplyChange = (commentId, text) => {
    setReplyInputs((prev) => ({
      ...prev,
      [commentId]: text,
    }));
  };

  const handleReplySubmit = async (commentId) => {
    const text = replyInputs[commentId];
    if (!text || !text.trim()) return;

    try {
      const res = await fetch(`${BASE_URL}/comments/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          newsId,
          parentId: commentId,
          commentText: text.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
        await refetchComments();
      }
    } catch (err) {
      console.error("Gagal kirim balasan:", err);
    }
  };

  const renderComments = (comments, depth = 0) => {
    return comments.map((comment) => (
      <div
        key={comment.id}
        className={`comment-wrapper depth-${depth}`}
      >
        <div className="comment-content">
          <p><strong>{comment.username}</strong>: {comment.commentText}</p>
        </div>

        <div className="comment-actions">
          <button onClick={() => onReactComment(comment.id, "like")}>👍 {comment.likes || 0}</button>
          <button onClick={() => onReactComment(comment.id, "dislike")}>👎 {comment.dislikes || 0}</button>
          <button onClick={() => toggleReplyInput(comment.id)}>💬 Balas</button>
          <button onClick={toggleEmojiPicker}>😊 Emoji</button>
          {showEmojiPicker && (
            <div ref={emojiPickerRef} className="emoji-picker-wrapper">
              <EmojiPicker onEmojiClick={handleEmojiSelect} />
            </div>
          )}
        </div>

        {replyInputs[comment.id] !== undefined && (
          <div className="reply-input">
            <input
              type="text"
              value={replyInputs[comment.id]}
              onChange={(e) => handleReplyChange(comment.id, e.target.value)}
              placeholder="Tulis balasan..."
            />
            <button onClick={() => handleReplySubmit(comment.id)}>Kirim</button>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="replies">
            {renderComments(comment.replies, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <>
      <div className="action-buttons">
        <button onClick={handleLike}>
          {isLiked ? `💖 ${likeCount}` : `👍 ${likeCount} Like`}
        </button>
        <button onClick={handleBookmark}>
          {isBookmarked ? "🔖 Bookmarked" : "🔖 Bookmark"}
        </button>
      </div>
    </>
  );
}

export default ActionButtons;






