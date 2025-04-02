import React, { useState } from "react";
import "./SendQuotationEmail.css";
import { FiX, FiPaperclip, FiSend } from "react-icons/fi";

const SendQuotationEmail = ({ quotationData, onClose }) => {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: `Quotation ${quotationData.quotationNumber}`,
    body: `Dear ${quotationData.customer},\n\nPlease find attached the quotation ${quotationData.quotationNumber} for your review.\n\nRegards,\n${quotationData.salesperson}`,
    attachment: true,
  });

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Email sent:", {
        ...emailData,
        quotationId: quotationData.quotationNumber,
      });
      setIsSending(false);
      setIsSent(true);

      // Auto-close after 2 seconds
      setTimeout(() => onClose(), 2000);
    }, 1500);
  };

  return (
    <div className="email-modal-overlay">
      <div className="email-modal">
        <div className="email-modal-header">
          <h3>Send Quotation via Email</h3>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {isSent ? (
          <div className="email-success">
            <div className="success-icon">✓</div>
            <h4>Email Sent Successfully!</h4>
            <p>The quotation has been sent to {emailData.to}</p>
          </div>
        ) : (
          <form onSubmit={handleSendEmail}>
            <div className="form-group">
              <label>To</label>
              <input
                type="email"
                name="to"
                value={emailData.to}
                onChange={handleInputChange}
                required
                placeholder="recipient@example.com"
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={emailData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="body"
                value={emailData.body}
                onChange={handleInputChange}
                rows="6"
                required
              />
            </div>

            <div className="attachment-section">
              <label>
                <input
                  type="checkbox"
                  name="attachment"
                  checked={emailData.attachment}
                  onChange={() =>
                    setEmailData({
                      ...emailData,
                      attachment: !emailData.attachment,
                    })
                  }
                />
                <FiPaperclip className="attachment-icon" />
                Attach Quotation PDF (QT-{quotationData.quotationNumber}.pdf)
              </label>
            </div>

            <div className="email-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={onClose}
                disabled={isSending}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="send-btn"
                disabled={isSending || !emailData.to}
              >
                {isSending ? (
                  "Sending..."
                ) : (
                  <>
                    <FiSend className="send-icon" /> Send Email
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SendQuotationEmail;
