import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-surface border-b border-outline-variant/20 sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-lg py-md max-w-container-max mx-auto">
        <Link href="/" className="font-h2 text-h2 font-bold text-on-surface tracking-tight">
          DeliBook
        </Link>
        <nav className="hidden md:flex items-center space-x-gutter">
          <Link
            href="/"
            className="font-button text-button text-secondary hover:underline decoration-1 underline-offset-4 transition-all duration-200 ease-in-out"
          >
            Trang chủ
          </Link>
          <Link
            href="#"
            className="font-button text-button text-secondary hover:underline decoration-1 underline-offset-4 transition-all duration-200 ease-in-out"
          >
            Về chúng tôi
          </Link>
          <Link
            href="#"
            className="font-button text-button text-secondary hover:underline decoration-1 underline-offset-4 transition-all duration-200 ease-in-out"
          >
            Dịch vụ
          </Link>
          <Link
            href="#"
            className="font-button text-button text-secondary hover:underline decoration-1 underline-offset-4 transition-all duration-200 ease-in-out"
          >
            Bài viết
          </Link>
        </nav>
        <div className="flex items-center space-x-md">
          <button className="bg-primary-container text-on-primary font-button text-button px-lg py-sm rounded-lg hover:bg-opacity-90 transition-opacity">
            Đăng nhập
          </button>
        </div>
      </div>
    </header>
  );
}
