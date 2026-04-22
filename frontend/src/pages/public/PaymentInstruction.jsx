import React, { useState, useRef } from "react";
import {
  FiPhone,
  FiCopy,
  FiCheck,
  FiUpload,
  FiAlertTriangle,
  FiX,
  FiImage,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const paymentNumber = "618994037";

let PaymentInstruction = () => {
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const fileInputRef = useRef(null);

  // 🔥 FROM BACKEND (mock now)
  const orderId = "ORD-98321";

  const cartItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 129.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200",
    },
    {
      id: 2,
      name: "Minimalist Leather Backpack",
      price: 89,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=200",
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 200 ? 0 : 15;
  const finalTotal = subtotal + shipping;

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleRemoveFile = () => {
    setFileName("");
    fileInputRef.current.value = "";
  };

  const handleConfirm = () => {
    setIsConfirming(true);

    // 🔥 later: API call → mark payment submitted
    setTimeout(() => {
      navigate("/order-confirmation");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-blue-950">
            Complete Your Payment
          </h1>
          <p className="text-gray-500 mt-2">
            Order ID:{" "}
            <span className="text-orange-500 font-semibold">{orderId}</span>
          </p>
        </div>

        {/* PAYMENT CARD */}
        <div className="bg-gradient-to-r from-blue-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl mb-8">
          <p className="text-sm text-blue-200 mb-3">Send payment to</p>

          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-orange-500 p-3 rounded-xl">
                <FiPhone />
              </div>

              <h2 className="text-4xl font-bold text-orange-400 tracking-widest">
                {paymentNumber}
              </h2>
            </div>

            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                copied ? "bg-green-500" : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {copied ? <FiCheck /> : <FiCopy />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <p className="mt-4 text-sm">
            Amount to send:
            <span className="ml-2 font-bold text-lg">
              ${finalTotal.toFixed(2)}
            </span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="space-y-6">
            {/* STEPS */}
            <div className="bg-white p-6 rounded-2xl border">
              <h2 className="font-bold text-blue-950 mb-5">
                Payment Instructions
              </h2>

              <div className="space-y-4 text-sm text-gray-600">
                <p>
                  1. Send <b>${finalTotal.toFixed(2)}</b> via EVC Plus
                </p>
                <p>2. Take screenshot of the transaction</p>
                <p>3. Send it to WhatsApp</p>
                <p>4. Include: Order ID, Name, Email</p>
              </div>
            </div>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/252${paymentNumber}?text=Hello,%20I%20sent%20payment%20for%20Order%20${orderId}%20Amount:%20$${finalTotal}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg"
            >
              Send Screenshot via WhatsApp
            </a>

            {/* UPLOAD */}
            <div className="bg-white p-6 rounded-2xl border">
              <h3 className="font-bold mb-4">Upload Screenshot (Optional)</h3>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                id="upload"
              />

              {!fileName ? (
                <label
                  htmlFor="upload"
                  className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-xl cursor-pointer"
                >
                  <FiUpload className="text-2xl text-gray-400" />
                  <p className="text-sm mt-2">Click to upload</p>
                </label>
              ) : (
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm truncate">{fileName}</span>
                  <button onClick={handleRemoveFile}>
                    <FiX />
                  </button>
                </div>
              )}
            </div>

            {/* ALERT */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-sm flex gap-2">
              <FiAlertTriangle />
              Your order will be confirmed after we verify your payment.
            </div>

            {/* BUTTON */}
            <button
              onClick={handleConfirm}
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg"
            >
              {isConfirming ? "Verifying..." : "I Have Sent the Payment"}
            </button>
          </div>

          {/* RIGHT */}
          <div className="bg-white p-6 rounded-2xl border h-fit sticky top-24">
            <h2 className="font-bold text-blue-950 mb-4">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={item.image}
                    className="w-14 h-14 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-orange-500">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInstruction;
