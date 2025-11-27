import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ShoppingBag, Search, Menu, User, Star, ArrowRight, 
  Filter, X, ChevronRight, Check, CreditCard, Heart, ShieldCheck 
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, ViewState, CartItem } from './types';
import gsap from 'gsap';
import AIChat from './components/AIChat';

// --- Components defined inline to adhere to file constraints (grouping logical UI parts) ---

const Navbar: React.FC<{ 
  cartCount: number; 
  onViewChange: (view: ViewState) => void;
  currentView: ViewState;
}> = ({ cartCount, onViewChange, currentView }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
      scrolled ? 'bg-lux-black/90 backdrop-blur-md border-white/10 py-4' : 'bg-transparent border-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => onViewChange('HOME')} className="font-serif text-2xl font-bold tracking-widest text-white">
            LUMINA
          </button>
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => onViewChange('HOME')} className={`text-sm font-medium hover:text-lux-gold transition-colors ${currentView === 'HOME' ? 'text-lux-gold' : 'text-gray-400'}`}>HOME</button>
            <button onClick={() => onViewChange('SHOP')} className={`text-sm font-medium hover:text-lux-gold transition-colors ${currentView === 'SHOP' ? 'text-lux-gold' : 'text-gray-400'}`}>SHOP</button>
            <button className="text-sm font-medium text-gray-400 hover:text-lux-gold transition-colors">VENDORS</button>
            <button className="text-sm font-medium text-gray-400 hover:text-lux-gold transition-colors">JOURNAL</button>
          </div>
        </div>
        <div className="flex items-center gap-6 text-white">
          <Search className="w-5 h-5 cursor-pointer hover:text-lux-gold transition-colors" />
          <User className="w-5 h-5 cursor-pointer hover:text-lux-gold transition-colors" />
          <div className="relative cursor-pointer hover:text-lux-gold transition-colors" onClick={() => onViewChange('CART')}>
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-lux-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <Menu className="w-6 h-6 md:hidden cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC<{ onShopNow: () => void }> = ({ onShopNow }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(heroRef.current, 
      { opacity: 0, scale: 1.1 }, 
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
    )
    .fromTo(textRef.current?.children || [], 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power3.out" },
      "-=1"
    );
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div ref={heroRef} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Store" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lux-black via-lux-black/40 to-transparent" />
      </div>
      <div ref={textRef} className="relative z-10 text-center max-w-4xl px-6">
        <h2 className="text-lux-gold font-medium tracking-[0.2em] mb-4 text-sm md:text-base">THE EXCLUSIVE EDIT</h2>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
          Redefining <br /> Modern Luxury.
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
          Discover a curated collection of exceptional pieces from the world's most distinguished independent creators and heritage brands.
        </p>
        <button 
          onClick={onShopNow}
          className="group relative px-8 py-4 bg-white text-black font-semibold tracking-wide overflow-hidden"
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
            EXPLORE COLLECTION <ArrowRight size={18} />
          </span>
          <div className="absolute inset-0 bg-lux-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
        </button>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => {
  return (
    <div 
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-900 mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <div className="absolute top-4 right-4 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-white text-black p-3 rounded-full hover:bg-lux-gold transition-colors shadow-xl">
            <ShoppingBag size={18} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white text-xs font-medium tracking-wider mb-1">SOLD BY {product.vendor.name.toUpperCase()}</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-white font-medium text-lg leading-tight group-hover:text-lux-gold transition-colors">{product.name}</h3>
          <p className="text-white font-serif">${product.price.toLocaleString()}</p>
        </div>
        <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
      </div>
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-lux-charcoal pt-20 pb-10 border-t border-white/5">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <h4 className="font-serif text-2xl text-white mb-6">LUMINA</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            The premier destination for luxury goods, connecting discerning tastes with master craftsmanship.
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-6">SHOPPING</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-lux-gold cursor-pointer">New Arrivals</li>
            <li className="hover:text-lux-gold cursor-pointer">Trending</li>
            <li className="hover:text-lux-gold cursor-pointer">Brands</li>
            <li className="hover:text-lux-gold cursor-pointer">Sales</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-6">CUSTOMER CARE</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-lux-gold cursor-pointer">Contact Us</li>
            <li className="hover:text-lux-gold cursor-pointer">Shipping & Returns</li>
            <li className="hover:text-lux-gold cursor-pointer">Authenticity Guarantee</li>
            <li className="hover:text-lux-gold cursor-pointer">Secure Payment</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-6">NEWSLETTER</h4>
          <div className="flex border-b border-gray-600 pb-2">
            <input type="email" placeholder="Email Address" className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500" />
            <button className="text-gray-400 hover:text-lux-gold text-sm font-medium">JOIN</button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; 2024 LUMINA Inc. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App Logic ---

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // View Refs for GSAP
  const pageRef = useRef<HTMLDivElement>(null);

  // Transition effect when changing views
  const changeView = (newView: ViewState) => {
    if (pageRef.current) {
      // 1. Animate Out: Fade out and slide UP (negative y)
      gsap.to(pageRef.current, {
        opacity: 0,
        y: -40, 
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          // 2. Change state
          setView(newView);
          window.scrollTo(0, 0);
          
          // 3. Animate In: Start from above (negative y) and slide DOWN to 0
          gsap.fromTo(pageRef.current, 
            { opacity: 0, y: -40 }, 
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
          );
        }
      });
    } else {
      setView(newView);
      window.scrollTo(0, 0);
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Visual feedback could be added here
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    changeView('PRODUCT_DETAILS');
  };

  // --- Views ---

  const renderHome = () => (
    <>
      <Hero onShopNow={() => changeView('SHOP')} />
      
      {/* Featured Section */}
      <section className="py-24 bg-lux-black">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-lux-gold font-medium tracking-widest text-sm mb-2">CURATED SELECTION</h3>
              <h2 className="font-serif text-4xl text-white">Trending Now</h2>
            </div>
            <button onClick={() => changeView('SHOP')} className="text-white hover:text-lux-gold transition-colors flex items-center gap-2 text-sm font-medium">
              VIEW ALL <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map(product => (
              <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Spotlight */}
      <section className="py-24 bg-white text-black relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-xl">
            <h2 className="font-serif text-5xl mb-6">Meet The Makers</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              We partner with the world's most visionary designers and independent artisans. 
              Each vendor is rigorously vetted to ensure authenticity, quality, and sustainable practices.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-bold text-2xl mb-1">500+</h4>
                <p className="text-sm text-gray-500">Verified Vendors</p>
              </div>
              <div>
                <h4 className="font-bold text-2xl mb-1">100%</h4>
                <p className="text-sm text-gray-500">Authenticity Guarantee</p>
              </div>
            </div>
            <button className="px-8 py-3 bg-black text-white hover:bg-lux-gold hover:text-black transition-colors duration-300">
              EXPLORE VENDORS
            </button>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000" 
          alt="Workshop"
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-20 hidden md:block" 
        />
      </section>
    </>
  );

  const renderShop = () => (
    <div className="pt-32 pb-24 container mx-auto px-6 min-h-screen">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="text-white font-serif text-xl mb-6 flex items-center gap-2">
              <Filter size={18} /> Filters
            </h3>
            <div className="space-y-2">
              <h4 className="text-lux-gold text-sm font-bold uppercase tracking-wider mb-3">Categories</h4>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`block text-sm py-1 transition-colors w-full text-left ${
                    activeCategory === cat ? 'text-white font-medium pl-2 border-l-2 border-lux-gold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lux-gold text-sm font-bold uppercase tracking-wider mb-3">Price Range</h4>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <input type="number" placeholder="0" className="w-20 bg-white/5 border border-white/10 p-2 rounded" />
              <span>-</span>
              <input type="number" placeholder="Max" className="w-20 bg-white/5 border border-white/10 p-2 rounded" />
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-serif text-white">{activeCategory}</h1>
            <span className="text-gray-400 text-sm">{filteredProducts.length} Results</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductDetails = () => {
    if (!selectedProduct) return null;
    return (
      <div className="pt-32 pb-24 container mx-auto px-6">
        <button onClick={() => changeView('SHOP')} className="text-gray-400 hover:text-white mb-8 flex items-center gap-2 text-sm">
           <ChevronRight className="rotate-180" size={16} /> BACK TO SHOP
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] w-full bg-gray-900 overflow-hidden rounded-sm">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square bg-white/5 cursor-pointer hover:opacity-80 transition-opacity">
                  <img src={selectedProduct.image} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-lux-gold text-sm tracking-widest uppercase">{selectedProduct.brand}</span>
                {selectedProduct.vendor.verified && (
                   <span className="flex items-center gap-1 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                     <ShieldCheck size={12} /> VERIFIED SELLER
                   </span>
                )}
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">{selectedProduct.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl text-white font-light">${selectedProduct.price.toLocaleString()}</span>
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  <Star fill="currentColor" size={14} />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-gray-500 ml-1">({selectedProduct.reviews} reviews)</span>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg mb-8 font-light">
                {selectedProduct.description}
              </p>
            </div>

            <div className="space-y-6 mb-12">
              <div>
                <h4 className="text-white font-medium mb-3">Key Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedProduct.features.map(feat => (
                    <li key={feat} className="flex items-center gap-2 text-gray-400 text-sm">
                      <div className="w-1.5 h-1.5 bg-lux-gold rounded-full" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-auto space-y-4">
              <button 
                onClick={() => {
                  addToCart(selectedProduct);
                  changeView('CART');
                }}
                className="w-full py-4 bg-white text-black font-semibold hover:bg-lux-gold transition-colors duration-300 flex items-center justify-center gap-2"
              >
                ADD TO BAG
              </button>
              <button className="w-full py-4 border border-white/20 text-white font-medium hover:bg-white/5 transition-colors duration-300 flex items-center justify-center gap-2">
                <Heart size={18} /> ADD TO WISHLIST
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCart = () => (
    <div className="pt-32 pb-24 container mx-auto px-6 min-h-[60vh]">
      <h1 className="font-serif text-4xl text-white mb-12">Shopping Bag</h1>
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-lg border border-white/10">
          <p className="text-gray-400 text-xl mb-6">Your bag is currently empty.</p>
          <button onClick={() => changeView('SHOP')} className="px-8 py-3 bg-white text-black font-medium hover:bg-lux-gold transition-colors">
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-6 p-6 bg-white/5 border border-white/10 rounded-sm">
                <div className="w-24 h-24 bg-gray-800 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-white">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{item.brand}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-white/20 rounded px-2 py-1">
                      <span className="text-gray-400 px-2 text-sm">Qty: {item.quantity}</span>
                    </div>
                    <button className="text-xs text-red-400 hover:text-red-300 underline">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 p-8 sticky top-32">
              <h3 className="text-white font-serif text-xl mb-6">Order Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between text-white font-medium text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
              </div>
              <button 
                onClick={() => changeView('CHECKOUT')}
                className="w-full py-4 bg-lux-gold text-black font-bold hover:bg-white transition-colors duration-300"
              >
                PROCEED TO CHECKOUT
              </button>
              <div className="mt-6 flex justify-center gap-4 text-gray-500">
                <CreditCard size={20} />
                <div className="w-8 h-5 bg-gray-600 rounded"></div>
                <div className="w-8 h-5 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCheckout = () => (
    <div className="pt-32 pb-24 container mx-auto px-6 max-w-4xl min-h-screen">
       <button onClick={() => changeView('CART')} className="text-gray-400 hover:text-white mb-8 flex items-center gap-2 text-sm">
           <ChevronRight className="rotate-180" size={16} /> BACK TO CART
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-2xl text-white mb-8">Secure Checkout</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-lux-gold outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">First Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-lux-gold outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Last Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-lux-gold outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Address</label>
                <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-lux-gold outline-none transition-colors" />
              </div>
              
              <div className="pt-8">
                <h3 className="font-medium text-white mb-4 flex items-center gap-2">
                  <CreditCard size={18} /> Payment Details
                </h3>
                <div className="p-6 border border-white/10 rounded-lg bg-white/5 space-y-4">
                  {/* Mock Stripe Element Look */}
                  <div className="w-full bg-black/50 border border-white/10 rounded p-3 h-12 flex items-center">
                    <span className="text-gray-500 text-sm">Card number</span>
                  </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="w-full bg-black/50 border border-white/10 rounded p-3 h-12 flex items-center">
                        <span className="text-gray-500 text-sm">MM / YY</span>
                      </div>
                      <div className="w-full bg-black/50 border border-white/10 rounded p-3 h-12 flex items-center">
                        <span className="text-gray-500 text-sm">CVC</span>
                      </div>
                   </div>
                </div>
              </div>

              <button type="button" className="w-full py-4 bg-lux-gold text-black font-bold mt-8 hover:opacity-90 transition-opacity">
                PAY ${cartTotal.toLocaleString()}
              </button>
            </form>
          </div>
          <div className="bg-white/5 p-8 h-fit border border-white/10">
            <h3 className="text-white font-serif mb-6">In Your Bag</h3>
            <div className="space-y-4 mb-6">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                   <img src={item.image} className="w-16 h-16 object-cover bg-gray-800" />
                   <div>
                     <p className="text-white text-sm">{item.name}</p>
                     <p className="text-gray-400 text-xs">{item.brand}</p>
                     <p className="text-lux-gold text-sm mt-1">${item.price.toLocaleString()}</p>
                   </div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between text-white font-bold">
              <span>Total</span>
              <span>${cartTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-lux-black text-lux-light selection:bg-lux-gold selection:text-black">
      <Navbar cartCount={cartCount} onViewChange={changeView} currentView={view} />
      
      <div ref={pageRef} className="min-h-screen">
        {view === 'HOME' && renderHome()}
        {view === 'SHOP' && renderShop()}
        {view === 'PRODUCT_DETAILS' && renderProductDetails()}
        {view === 'CART' && renderCart()}
        {view === 'CHECKOUT' && renderCheckout()}
      </div>

      <AIChat onNavigateToProduct={(p) => {
        setSelectedProduct(p);
        changeView('PRODUCT_DETAILS');
      }} />

      <Footer />
    </div>
  );
};

export default App;