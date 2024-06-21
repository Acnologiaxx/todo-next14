import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full">
        <div className="py-6 font-bold bg-blue-400 text-center flex justify-between pr-10">
          <div>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "black",
                marginLeft: 30,
              }}
            >
              Login
            </Link>
          </div>
          <div>
            <Link
              href="/contact"
              style={{
                textDecoration: "none",
                color: "black",
                marginRight: 30,
              }}
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              style={{
                textDecoration: "none",
                color: "black",
                marginRight: 10,
              }}
            >
              About
            </Link>
          </div>
        </div>
      </div>
  );
}
