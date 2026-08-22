const fs = require('fs');
let page = fs.readFileSync('app/(store)/page.tsx', 'utf8');

const regex = /      \{\/\* 6\. YOUTUBE SHOWCASE \*\/\}\r?\n      <section className="py-20 bg-white">[\s\S]*?<\/section>\r?\n\s*\{\/\* ABOUT US SECTION \*\/\}/m;

const replacement = \      {/* 6. YOUTUBE SHOWCASE */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/3 space-y-6 text-center lg:text-left">
              <ScrollReveal animation="fade-right">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-tight">
                  Watch Our Excellence
                </h2>
                <div className="h-1 w-20 bg-red-600 rounded-full mt-4 mx-auto lg:mx-0" />
                <p className="text-gray-600 mt-6 leading-relaxed font-medium">
                  ???????? ????? ?????? ???????? ?????, ?????? YouTube ????? ?????????. ??????????? ????? ?????????? ??????? ?????????????? ?????? ???????? ?????????!
                </p>
                <div className="mt-8">
                  <a href="https://youtube.com/@skycrackersofficial" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full transition-colors shadow-lg hover:shadow-xl">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    Subscribe Now
                  </a>
                </div>
              </ScrollReveal>
            </div>
            <div className="w-full lg:w-2/3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {displayVideos.map((video: any, i: number) => (
                  <ScrollReveal key={video.id} animation="fade-up">
                    <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="block bg-gray-50 p-2 rounded-3xl shadow-lg border border-gray-200 group cursor-pointer relative overflow-hidden aspect-video">
                      <Image
                        src={video.thumbnailUrl || HOMEPAGE_IMAGES.youtube}
                        alt={video.title || "YouTube Video"}
                        fill
                        className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-16 w-16 bg-red-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <svg className="w-8 h-8 text-white fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                      {video.title && (
                         <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                           <p className="text-white font-bold truncate">{video.title}</p>
                         </div>
                      )}
                    </a>
                  </ScrollReveal>
                ))}
              </div>
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
