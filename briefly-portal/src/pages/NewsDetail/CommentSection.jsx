import React, { useEffect, useState } from "react";
import axios from "axios";
import { nestComments } from "./hook/nestComments";
import "./Styles/CommentSection.css"

function CommentSection({ newsId, userId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [replyInputs, setReplyInputs] = useState({});

  useEffect(() => {
    fetchComments();
  }, [newsId]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${newsId}`);
      const nested = nestComments(res.data);
      setComments(nested);
    } catch (err) {
      console.error("Gagal mengambil komentar:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/comments", {
        userId,
        newsId,
        commentText,
      });
      setCommentText("");
      fetchComments();
    } catch (err) {
      console.error("Gagal mengirim komentar:", err);
    }
  };

  const handleReplyToggle = (commentId) => {
    setReplyInputs((prev) => ({
      ...prev,
      [commentId]: prev[commentId] ? "" : "",
    }));
  };

  const handleReplyInputChange = (e, commentId) => {
    const value = e.target.value;
    setReplyInputs((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };

  const handleReplySubmit = async (parentId) => {
    const replyText = replyInputs[parentId];
    if (!replyText?.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/comments/reply", {
        userId,
        newsId,
        parentId,
        commentText: replyText,
      });
      setReplyInputs((prev) => ({ ...prev, [parentId]: "" }));
      fetchComments();
    } catch (err) {
      console.error("Gagal membalas komentar:", err);
    }
  };

  const renderComments = (commentList, depth = 0) => {
    return commentList.map((comment) => (
      <div
        key={comment.id}
        className="comment-item"
        style={{ marginLeft: depth * 20, borderLeft: depth ? "1px solid #ccc" : "none", paddingLeft: 10 }}
      >
        <div className="comment-header">
          <img
            src={comment.profileImage}
            alt={comment.username}
            width={30}
            height={30}
            style={{ borderRadius: "50%" }}
          />
          <strong>{comment.username}</strong>
          <p>{comment.commentText}</p>
        </div>

        {/* Tombol Balas */}
        <button onClick={() => handleReplyToggle(comment.id)}>Balas</button>

        {/* Input Balasan */}
        {replyInputs.hasOwnProperty(comment.id) && (
          <div className="reply-input">
            <input
              type="text"
              placeholder="Tulis balasan..."
              value={replyInputs[comment.id]}
              onChange={(e) => handleReplyInputChange(e, comment.id)}
            />
            <button onClick={() => handleReplySubmit(comment.id)}>Kirim</button>
          </div>
        )}

        {/* Render nested replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="replies">{renderComments(comment.replies, depth + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="comment-section">
      <h3>Komentar</h3>

      {/* Input komentar utama */}
      <div className="comment-input">
        <textarea
          placeholder="Tulis komentar..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Kirim</button>
      </div>

      {/* Komentar Nested */}
      <div className="comments-list">{renderComments(comments)}</div>
    </div>
  );
}

export default CommentSection;