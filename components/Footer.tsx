export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0B0B] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold">Jio Connect</h3>
            <p className="mt-3 text-sm text-white/60">
              Premium digital experience inspired by modern telecom services.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Quick Links</h4>
            <div className="mt-3 space-y-2 text-sm text-white/60">
              <p>Home</p>
              <p>Products</p>
              <p>Services</p>
              <p>Plans</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Support</h4>
            <div className="mt-3 space-y-2 text-sm text-white/60">
              <p>Contact Us</p>
              <p>Help Center</p>
              <p>Customer Support</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Connect</h4>
            <p className="mt-3 text-sm text-white/60">
              Stay connected with our latest products and services.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Jio Connect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}