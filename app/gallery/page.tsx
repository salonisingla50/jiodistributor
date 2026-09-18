'use client';
import Image from 'next/image';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowRight, Image as ImageIcon, X} from 'lucide-react';

const photos = [
  {src:'/gallery/jio-moment-1.jpeg', title:'Jio Store Moment', category:'Jio Store'},
  {src:'/gallery/jio-moment-2.jpg', title:'Team & Customer Moment', category:'Team'},
];

export default function Gallery(){
  const [active,setActive]=useState<any>(null);
  const [filter,setFilter]=useState('All');
  const cats=['All','Team','Customers','Events','Jio Store'];
  const list=photos.filter(p=>filter==='All'||p.category===filter);

  return <main>
    <section style={{background:'linear-gradient(135deg,#06132f,#0757ff)',color:'#fff',padding:'72px 0'}}>
      <div className="wrap">
        <div style={{color:'#55b4ff',fontWeight:800,fontSize:13}}>OUR GALLERY</div>
        <h1 style={{fontSize:'clamp(44px,6vw,70px)',margin:'10px 0',letterSpacing:-2}}>Moments That Matter</h1>
        <p style={{maxWidth:600,color:'#dce8ff',fontSize:18,lineHeight:1.7}}>A glimpse of our journey, people and connected experiences.</p>
      </div>
    </section>

    <section className="wrap" style={{padding:'50px 24px 80px'}}>
      <div style={{display:'flex',justifyContent:'center',gap:10,flexWrap:'wrap',marginBottom:30}}>
        {cats.map(c=><button key={c} onClick={()=>setFilter(c)} className={filter===c?'btn primary':'btn ghost'}>{c}</button>)}
      </div>

      {list.length ? <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))'}}>
        {list.map((p,i)=><button key={p.src} onClick={()=>setActive(p)} style={{border:0,padding:0,textAlign:'left',background:'transparent',cursor:'pointer'}}>
          <div className="card" style={{overflow:'hidden'}}>
            <div style={{position:'relative',height:i===0?390:330}}>
              <Image src={p.src} alt={p.title} fill sizes="(max-width:800px) 100vw, 50vw" style={{objectFit:'cover'}}/>
            </div>
            <div style={{padding:'18px 20px'}}>
              <div style={{fontSize:12,color:'#0757ff',fontWeight:800}}>{p.category.toUpperCase()}</div>
              <h2 style={{fontSize:20,margin:'6px 0'}}>{p.title}</h2>
              <span style={{color:'#667085',fontSize:13}}>View photo →</span>
            </div>
          </div>
        </button>)}
      </div> : <div className="card" style={{padding:45,textAlign:'center'}}>No photos in this category yet.</div>}

      <div className="card shine" style={{marginTop:35,padding:32,display:'flex',alignItems:'center',justifyContent:'space-between',gap:20,flexWrap:'wrap'}}>
        <div><h2 style={{margin:'0 0 7px'}}>Add more moments anytime</h2><p style={{margin:0,color:'#667085'}}>Place new images inside <b>public/gallery</b> and add them to the gallery list.</p></div>
        <Link href="/contact" className="btn primary">Contact us <ArrowRight size={17}/></Link>
      </div>
    </section>

    {active && <div onClick={()=>setActive(null)} style={{position:'fixed',inset:0,zIndex:100,background:'#000b',display:'grid',placeItems:'center',padding:25}}>
      <button onClick={()=>setActive(null)} style={{position:'absolute',right:25,top:25,border:0,borderRadius:'50%',width:45,height:45,display:'grid',placeItems:'center',cursor:'pointer'}}><X/></button>
      <div onClick={e=>e.stopPropagation()} style={{position:'relative',width:'min(1000px,95vw)',height:'min(78vh,700px)',background:'#111',borderRadius:20,overflow:'hidden'}}>
        <Image src={active.src} alt={active.title} fill sizes="95vw" style={{objectFit:'contain'}}/>
      </div>
    </div>}
  </main>
}