import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function Index() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const formSectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState({
    days: 5,
    hours: 10,
    minutes: 6,
    seconds: 9,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const googleFormUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLScpDxWaeIj18xjSo_woSoqzquWR-Cnp4j1lW3XYJAzG-8xTxA/formResponse";
    const formDataUrl = new URLSearchParams();

    formDataUrl.append("entry.40703", formData.name); // Họ và tên
    formDataUrl.append("entry.1002107389", formData.phone); // Số điện thoại
    formDataUrl.append("entry.804247619", formData.email); // Email

    try {
      await fetch(googleFormUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDataUrl.toString(),
      });
      // Mở modal thay vì alert
      setIsModalOpen(true);
      setIsFormSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "", // <-- Đã sửa giá trị reset
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const handleGiftCardClick = (url: string) => {
    if (isFormSubmitted) {
      if (url.startsWith("http")) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        navigate(url);
      }
    } else {
      formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Inter']">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#004449] to-[#00ACB8] pt-8 pb-16">
        {/* Navigation */}
        <nav className="container mx-auto px-4 lg:px-12 flex justify-between items-center mb-24 lg:mb-32">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/b9c943ece24ea150eeb38f67909f8645f0348bb8?width=230"
            alt="Finful"
            className="h-8 lg:h-9"
          />
          <div className="hidden md:flex items-center gap-8 lg:gap-12 text-white">
            <a
              href="https://tuvandautu.finful.co/"
              className="text-sm lg:text-[15px] font-semibold hover:opacity-80 transition"
            >
              Tư vấn Đầu tư
            </a>
            <a
              href="https://tuvanmuanha.finful.co/"
              className="text-sm lg:text-[15px] font-semibold hover:opacity-80 transition"
            >
              Tư vấn Mua nhà
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="group flex items-center gap-1 text-sm lg:text-[15px] font-semibold hover:text-teal transition-colors">
                  Giáo dục tài chính
                  <svg
                    width="9"
                    height="6"
                    viewBox="0 0 9 6"
                    fill="none"
                    className="mt-1 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.70899 0.336594C8.89916 0.545319 9 0.820537 9 1.10012C9 1.3797 8.89916 1.65492 8.70899 1.86365L5.24587 5.66345C5.05442 5.87345 4.78578 6 4.4963 6C4.20683 6 3.93823 5.8735 3.74678 5.6635L0.281168 1.86096L0.278722 1.85818C0.0943012 1.64867 -0.00215346 1.37564 3.61916e-05 1.09914C0.00222584 0.822638 0.103012 0.551121 0.291118 0.344728C0.480378 0.137068 0.745186 0.0108831 1.03134 0.00815449C1.31756 0.00542592 1.58477 0.12661 1.77774 0.331099L1.78028 0.3338L4.33793 3.1401C4.42292 3.23335 4.56969 3.23335 4.65468 3.1401L7.20982 0.336546C7.40127 0.126551 7.66991 -7.07934e-08 7.95938 -4.54868e-08C8.24886 -2.01802e-08 8.51754 0.126599 8.70899 0.336594Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60 text-[#656C86] text-[15px] font-medium mt-2">
                <DropdownMenuItem className="py-2.5 px-4 focus:bg-teal-50 focus:text-teal cursor-pointer">
                  <a href="https://app.finful.co/sign-in?redirect_url=https%3A%2F%2Fapp.finful.co%2Fcourse%2F65fb0e91feebb569c2191340%3Ffbclid%3DIwY2xjawGXuQ9leHRuA2FlbQIxMAABHQz4oKhOcoGY-vfIIYNQ0Bi8Grznu_ZpfIf_M0V_mZ5CF8qkodGIA2rAcQ_aem_ZUu0TxwVY7QuOmaOqMPvDA" className="w-full">
                    Thư viện tài chính cá nhân
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2.5 px-4 focus:bg-teal-50 focus:text-teal cursor-pointer">
                  <a href="https://education.finful.co/" className="w-full">
                    Chương trình cho doanh nghiệp
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="container mx-auto px-4 lg:px-12 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EEE] via-[#F1F1F1] to-white mb-2 lg:mb-3 tracking-tight">
            QUÀ TẶNG ƯU TIÊN
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white mb-8 lg:mb-12">
            Tiết kiệm hàng giờ tự tìm hiểu trong "biển" thông tin nhiễu loạn
          </p>

          {/* Feature Pills */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 lg:gap-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 px-4 py-2 lg:px-5 lg:py-2.5 rounded-xl border border-[#FFC344] bg-white/20 backdrop-blur-sm">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/eb25153564577c884fa1edb2b7f969b0f8a84305?width=54"
                alt=""
                className="w-6 h-6 lg:w-7 lg:h-7"
              />
              <span className="text-white text-base lg:text-xl italic">
                Hiểu rõ "chuyện gì đang xảy ra"
              </span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 lg:px-5 lg:py-2.5 rounded-xl border border-[#FFC344] bg-white/20 backdrop-blur-sm">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/eb25153564577c884fa1edb2b7f969b0f8a84305?width=54"
                alt=""
                className="w-6 h-6 lg:w-7 lg:h-7"
              />
              <span className="text-white text-base lg:text-xl italic">
                Tự tin "sắp tới phải làm gì"
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Cards Section */}
      <section className="container mx-auto px-4 lg:px-12 mb-16 lg:mb-24 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div
            className="bg-white rounded-xl border border-[#EEE] shadow-lg overflow-hidden cursor-pointer"
            onClick={() => handleGiftCardClick("https://drive.google.com/file/d/1p8qlB1kzWr3Spz3odYkwTrjg-bp8zxdH/view?usp=sharing")}
          >
            <div className="relative">
              <img 
                src="card1.png" 
                alt="x2 tài sản trong 6 tháng BÍ MẬT TOP 1% NHÀ ĐẦU TƯ" 
                className="w-full h-56 lg:h-64 object-cover" 
              />
              <div className="absolute top-4 right-4 px-4 py-2.5 rounded-md border border-[#00ACB8] bg-white shadow-md">
                <span className="text-[#00ACB8] text-lg lg:text-xl font-semibold italic">
                  Giá gốc: 5.000.000
                </span>
              </div>
            </div>
            <div className="p-5 lg:p-6">
              <h3 className="text-xl lg:text-2xl font-semibold uppercase mb-4 lg:mb-5">
                x2 tài sản trong 6 tháng BÍ MẬT TOP 1% NHÀ ĐẦU TƯ
              </h3>
              <p className="text-lg lg:text-[22px] leading-normal">
                Cơ hội x2 tài sản không đến từ may mắn, mà đến từ phương pháp mà
                Top 1% luôn giữ kín. Đây không phải là lý thuyết, đây là tấm bản
                đồ hành động của họ. Cơ hội x2 tài sản ngay hôm nay
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white rounded-xl border border-[#EEE] shadow-lg overflow-hidden cursor-pointer"
            onClick={() => handleGiftCardClick("https://drive.google.com/file/d/18kStB1DiwRh2R8wcz4uO-5-utiF5eM0Q/view?usp=sharing")}
          >
            <div className="relative">
              <img 
                src="card2.png" 
                alt="x2 tài sản trong 6 tháng BÍ MẬT TOP 1% NHÀ ĐẦU TƯ" 
                className="w-full h-56 lg:h-64 object-cover" 
              />
              <div className="absolute top-4 right-4 px-4 py-2.5 rounded-md border border-[#00ACB8] bg-white shadow-md">
                <span className="text-[#00ACB8] text-lg lg:text-xl font-semibold italic">
                  Giá gốc: 3.000.000
                </span>
              </div>
            </div>
            <div className="p-5 lg:p-6">
              <h3 className="text-xl lg:text-2xl font-semibold uppercase mb-4 lg:mb-5">
                LA BÀN NỘI TÂM: Giải Mã DNA Đầu Tư Của Chính Bạn
              </h3>
              <p className="text-lg lg:text-[22px] leading-normal">
              Thị trường có thể hỗn loạn, nhưng quyết định của bạn thì không. Nắm vững tâm lý, làm chủ hành vi và đầu tư với sự tự tin tuyệt đối. Tải và nhận tấm bản đồ chi tiết để đầu tư tối ưu.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="mt-6 lg:mt-8 max-w-6xl mx-auto">
          <div
            className="bg-white rounded-xl border border-[#EEE] shadow-lg overflow-hidden lg:max-w-[570px] cursor-pointer"
            onClick={() => handleGiftCardClick("https://muanha.finful.co/")}
          >
            <img 
              src="card3.png" 
              alt="Công cụ phân tích tính khả thi của mục tiêu mua nhà" 
              className="w-full h-56 lg:h-64 object-cover" 
            />
            <div className="p-5 lg:p-6">
              <h3 className="text-xl lg:text-2xl font-semibold uppercase mb-4 lg:mb-5">
                CÔNG CỤ PHÂN TÍCH TÍNH KHẢ THI CỦA MỤC TIÊU MUA NHÀ
              </h3>
              <p className="text-lg lg:text-[22px] leading-normal">
                Nhập các thông tin về căn nhà muốn mua và tình hình tài chính
                của bạn, chúng tôi sẽ cho bạn biết mong muốn đó có thể hiện thức
                hoá không.
              </p>
            </div>
          </div>
        </div>
      </section>

      {!isFormSubmitted && (
        <>
          {/* Divider */}
          <div className="w-full h-px bg-[#CFD2DB] mb-16 lg:mb-24"></div>

          {/* Registration Form Section */}
          <section
            ref={formSectionRef}
            className="container mx-auto px-4 lg:px-12 mb-16 lg:mb-24"
          >
            <div className="max-w-3xl mx-auto bg-[#F4FBFB] rounded-xl border border-[#00ACB8] p-8 lg:p-16">
              <div className="text-center mb-12 lg:mb-16">
                <h2 className="text-xl lg:text-5xl font-semibold text-[#0D0F2C] mb-1 lg:mb-2 tracking-tight">
                  Đăng ký thông tin để
                </h2>
                <h2 className="text-xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7FD5DB] via-[#00ACB8] to-[#008993] tracking-tight">
                  MỞ KHOÁ QUÀ TẶNG
                </h2>
              </div>

              <form
                onSubmit={handleFormSubmit}
                className="space-y-5 lg:space-y-6 max-w-lg mx-auto"
              >
                <div>
                  <label className="block text-[#5B5B5B] text-base font-semibold mb-2">
                    Họ tên*
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập họ tên"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-md border border-[#00ACB8] bg-white text-[15px] placeholder:text-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#00ACB8]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#5B5B5B] text-base font-semibold mb-2">
                    Số điện thoại*
                  </label>
                  <input
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-md border border-[#00ACB8] bg-white text-[15px] placeholder:text-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#00ACB8]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#5B5B5B] text-base font-semibold mb-2">
                    Email*
                  </label>
                  <input
                    type="email"
                    placeholder="Nhập email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-md border border-[#00ACB8] bg-white text-[15px] placeholder:text-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#00ACB8]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00ACB8] text-white text-lg font-medium py-4 rounded-lg hover:bg-[#008993] transition-colors"
                >
                  Gửi thông tin
                </button>
              </form>
            </div>
          </section>
        </>
      )}

      {/* CTA Message Section */}
      <section className="container mx-auto px-2 lg:px-12 mb-16 lg:mb-20">
        <div className="text-center max-w-5xl mx-auto">
          <div className="flex justify-center items-center gap-2 lg:gap-3 mb-3">
            <h2 className="text-xl lg:text-5xl font-semibold text-[#0D0F2C] opacity-80 tracking-tight">
              Chỉ kiến thức thị trường
            </h2>
            <h2 className="text-xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#7FD5DB] via-[#00ACB8] to-[#008993] tracking-tight">
              là chưa đủ!
            </h2>
          </div>
          <h3 className="text-xl lg:text-[45px] font-bold text-[#0D0F2C] tracking-tight">
            BẠN CẦN SỰ ĐỒNG HÀNH CỦA CHUYÊN GIA!
          </h3>
        </div>
      </section>

      {/* Consultation Pricing Section */}
      <section className="relative bg-[#E2F6FC] py-16 lg:py-20 mb-0 overflow-hidden">
        {/* Background Pattern SVG */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute right-0 top-0 h-full w-auto opacity-60"
            width="1349"
            height="851"
            viewBox="0 0 1349 851"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M866.706 458.522C711.645 525.777 640.465 705.999 707.72 861.06C774.975 1016.12 955.197 1087.3 1110.26 1020.05C1265.32 952.791 1336.5 772.569 1269.24 617.508C1201.99 462.447 1021.77 391.267 866.706 458.522Z"
              fill="url(#paint0_linear)"
              opacity="0.5"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="949.618"
                y1="432.457"
                x2="1106.3"
                y2="885.868"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#CCEEF0" />
                <stop offset="1" stopColor="#E5F6F7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:px-12 relative z-10">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-4xl lg:text-6xl font-black text-[#3D3E56] mb-4 lg:mb-6">
              SIÊU ƯU ĐÃI
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 rounded-full bg-gradient-to-r from-[#00ACB8] via-[#7FD5DB] to-[#00ACB8]">
                <span className="text-white text-md lg:text-3xl font-bold">
                  TRẢI NGHIỆM
                </span>
              </div>
              <p className="text-md lg:text-[34px] font-bold text-[#0D0F2C]">
                TƯ VẤN TÀI CHÍNH 1:1
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-6 mb-12 lg:mb-16">
            <button onClick={() => window.open("https://tuvanmuanha.finful.co/", "_blank")} className="px-8 py-4 rounded-full bg-[#FFC344] text-[#333] text-xl lg:text-[23px] font-bold shadow-lg hover:shadow-xl transition-shadow">
              Tư vấn mua nhà →
            </button>
            <button onClick={() => window.open("https://tuvandautu.finful.co/", "_blank")} className="px-8 py-4 rounded-full bg-[#FFC344] text-[#333] text-xl lg:text-[23px] font-bold shadow-lg hover:shadow-xl transition-shadow">
              Tư vấn đầu tư →
            </button>
          </div>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-2 lg:gap-4 mb-12 lg:mb-16">
            <div className="flex flex-col items-center">
              <div className="bg-[#002224] rounded-lg px-4 lg:px-6 py-6 lg:py-8 min-w-[70px] lg:min-w-[88px]">
                <span className="text-white text-3xl lg:text-[40px] font-semibold tracking-tight">
                  {String(countdown.days).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[#002224] text-xl lg:text-[32px] font-medium mt-2 opacity-70">
                Ngày
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#002224] rounded-lg px-4 lg:px-6 py-6 lg:py-8 min-w-[70px] lg:min-w-[88px]">
                <span className="text-white text-3xl lg:text-[40px] font-semibold tracking-tight">
                  {String(countdown.hours).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[#002224] text-xl lg:text-[32px] font-medium mt-2 opacity-70">
                Giờ
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#002224] rounded-lg px-4 lg:px-6 py-6 lg:py-8 min-w-[70px] lg:min-w-[88px]">
                <span className="text-white text-3xl lg:text-[40px] font-semibold tracking-tight">
                  {String(countdown.minutes).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[#002224] text-xl lg:text-[32px] font-medium mt-2 opacity-70">
                Phút
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-[#002224] rounded-lg px-4 lg:px-6 py-6 lg:py-8 min-w-[70px] lg:min-w-[88px]">
                <span className="text-white text-3xl lg:text-[40px] font-semibold tracking-tight">
                  {String(countdown.seconds).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[#002224] text-xl lg:text-[32px] font-medium mt-2 opacity-70">
                Giây
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#EEE] to-white rounded-xl border border-[#00ACB8] p-8 lg:p-12">
            <p className="text-[#66CDD4] text-center text-lg font-semibold mb-4">
              GIÁ TRẢI NGHIỆM CHỈ:
            </p>
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center gap-3 mb-2">
                <span className="text-[#00565C] text-4xl lg:text-5xl font-bold">
                  399.000 VNĐ/
                </span>
                <span className="text-[#00565C] text-2xl lg:text-[32px] tracking-tight">
                  buổi tư vấn
                </span>
              </div>
              <div className="h-px bg-[#66CDD4] w-full max-w-xl mx-auto my-4"></div>
              <div className="flex items-baseline justify-center gap-3">
                <span className="text-[#00565C] text-3xl lg:text-[40px] font-bold">
                  999.000 VNĐ/
                </span>
                <span className="text-[#00565C] text-2xl lg:text-[32px] tracking-tight">
                  gói 3 buổi tư vấn
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#232B35] py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="space-y-3">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/99907c7262a3878b061f5b274fb9f4dbeb82d46c?width=320"
                  alt="Finful"
                  className="h-12"
                />
                <p className="text-white text-[15px] font-medium opacity-70">
                  © 2025 Finful, Inc. All rights reserved.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/db8bfd14369d9eb929b094c09b5aa978fee34bb2?width=56"
                    alt="Facebook"
                    className="w-7 h-7"
                  />
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/acba98170790077f72c74e3dde0cf0c0af6e9f52?width=56"
                    alt="LinkedIn"
                    className="w-7 h-7"
                  />
                </div>
                <p className="text-white text-[15px] font-medium">
                  hello@finful.co
                </p>
              </div>
            </div>

            {/* Company Links */}
            <div className="space-y-4">
              <h3 className="text-white text-[15px] font-bold opacity-70">
                CÔNG TY
              </h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-white text-sm font-medium hover:opacity-80 transition"
                >
                  Về chúng tôi
                </a>
                <a
                  href="#"
                  className="block text-white text-sm font-medium hover:opacity-80 transition"
                >
                  Blog
                </a>
                <a
                  href="#"
                  className="block text-white text-sm font-medium hover:opacity-80 transition"
                >
                  Liên hệ
                </a>
              </div>
            </div>

            {/* Individual Services */}
            <div className="space-y-4">
              <h3 className="text-white text-[15px] font-bold opacity-70">
                DÀNH CHO CÁ NHÂN
              </h3>
              <div className="space-y-2">
                <a
                  href="https://tuvanmuanha.finful.co/"
                  className="block text-white text-sm font-medium hover:opacity-80 transition"
                >
                  Đồng hành và Tư vấn Mua nhà
                </a>
                <a
                  href="https://tuvandautu.finful.co/"
                  className="block text-white text-sm font-medium hover:opacity-80 transition"
                >
                  Đồng hành và Tư vấn Đầu tư
                </a>
                <a
                  href="https://app.finful.co/sign-in?redirect_url=https%3A%2F%2Fapp.finful.co%2Fcourse%2F65fb0e91feebb569c2191340%3Ffbclid%3DIwY2xjawGXuQ9leHRuA2FlbQIxMAABHQz4oKhOcoGY-vfIIYNQ0Bi8Grznu_ZpfIf_M0V_mZ5CF8qkodGIA2rAcQ_aem_ZUu0TxwVY7QuOmaOqMPvDA"
                  className="block text-white text-sm font-medium hover:opacity-80 transition"
                >
                  Thư viện tài chính cá nhân
                </a>
                <a
                  href="https://global.finful.co/sign-in?redirect_url=https%3A%2F%2Fglobal.finful.co%2Fcourse%2F654b4b6c919baafbb5c4e975%3Ffbclid%3DIwY2xjawGXuPtleHRuA2FlbQIxMAABHVmJVUh1h6PjYXMWcGrc4Rk4_QmPn22qZimfZLo3aj_a-POutj-ma8d90w_aem_j78gg5nee3mqU6GYcU4ItA"
                  className="block text-white text-sm font-medium hover:opacity-80 transition"
                >
                  Thư viện phân tích chứng khoán
                </a>
              </div>
            </div>

            {/* Organization Services */}
            <div className="space-y-4">
              <h3 className="text-white text-[15px] font-bold opacity-70">
                DÀNH CHO TỔ CHỨC
              </h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-white text-sm font-medium hover:opacity-80 transition"
                >
                  Thiết kế nội dung giáo dục tài chính
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md text-center p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-4">
              MỞ KHOÁ THÀNH CÔNG!
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center mb-6">
            <img
              src="cracker 1.png"
              alt="Success"
              className="w-24 h-24"
            />
          </div>
          <p className="text-center text-lg">
            Các thông tin và dự báo thị trường đang chờ bạn khám phá!
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
