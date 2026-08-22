const fs = require('fs');
let page = fs.readFileSync('app/(store)/page.tsx', 'utf8');

const regex = /      \{\/\* 6\. YOUTUBE SHOWCASE \*\/\}\r?\n      <section className="py-20 bg-gray-50 border-t border-gray-100">[\s\S]*?<\/section>\r?\n\s*\{\/\* ABOUT US SECTION \*\/\}/m;

const replacement = \      {/* 6. YOUTUBE SHOWCASE */}
      <section className="py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left: Video */}
            <div className="w-full lg:w-1/2 relative">
              <div className="grid grid-cols-1 gap-6">
                {displayVideos.slice(0, 1).map((video: any, i: number) => (
                  <ScrollReveal key={video.id} animation="fade-right">
                    <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="block bg-white p-2 rounded-[2rem] shadow-2xl border border-gray-200 group cursor-pointer relative overflow-hidden aspect-video">
                      <Image
                        src={video.thumbnailUrl || HOMEPAGE_IMAGES.youtube}
                        alt={video.title || "YouTube Video"}
                        fill
                        className="object-cover rounded-[1.5rem] group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 rounded-[1.5rem] bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-20 w-20 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <svg className="w-10 h-10 text-white fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                      <div className="absolute top-6 left-6 flex justify-between items-start">
                         <span className="bg-red-600 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest animate-pulse flex items-center gap-2">
                           <span className="w-2 h-2 bg-white rounded-full"></span> Live
                         </span>
                      </div>
                      {video.title && (
                         <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-[1.5rem]">
                           <p className="text-white font-extrabold text-2xl truncate">{video.title}</p>
                         </div>
                      )}
                    </a>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left pl-0 lg:pl-4">
              <ScrollReveal animation="fade-left">
                <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">Premium Quality in Action</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 uppercase tracking-tight leading-[1.1]">
                  Experience The <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Magic of Sivakasi</span>
                </h2>
                <div className="h-1.5 w-24 bg-red-600 rounded-full mt-8 mx-auto lg:mx-0" />
                
                <p className="text-gray-600 mt-8 text-lg lg:text-xl leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                  Words can only say so much. Watch our exclusive showcase to see the brilliant colors, spectacular bursts, and superior quality of Sky Crackers. We bring the grandest celebrations directly to your screen!
                </p>
                
                <div className="mt-12">
                  <a href="https://youtube.com/@skycrackersofficial" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold px-8 py-4 rounded-full transition-all shadow-xl hover:shadow-red-600/30 hover:-translate-y-1 text-lg group">
                    <svg className="w-7 h-7 fill-current group-hover:animate-bounce" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    Visit Us Live
                  </a>
                </div>
              </ScrollReveal>
            </div>
            
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
\;

if(page.match(regex)) {
  page = page.replace(regex, replacement);
  fs.writeFileSync('app/(store)/page.tsx', page);
  console.log("Success");
} else {
  console.log("Regex didn't match.");
}
