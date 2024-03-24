import { cn } from 'lib/utils';
import useRandomArticles from 'hooks/useRandomArticles';

export default function ArticlesWrapper() {
  const articles = useRandomArticles();
  return (
    <div className="rounded-2 relative grid grid-cols-1 gap-0 divide-y divide-gray-500 rounded-2xl bg-primary p-4 sm:p-6 lg:p-8">
      {articles.map((article, idx) => (
        <Article
          key={idx}
          className={`py-4 ${idx === articles.length - 1 ? 'pb-0' : ''}`}
          title={article.title}
          date={article.date}
          author={article.author}
          imgUrl={article.imgUrl}
          url={article.url}
        />
      ))}
    </div>
  );
}

interface IArticle {
  className?: string;
  title: string;
  date: string;
  author?: string;
  imgUrl?: string;
  url: string;
}

function Article({ title, date, author, imgUrl, url, className }: IArticle) {
  return (
    <article
      className={cn(
        'group relative grid w-full grid-cols-3 items-start justify-between gap-4',
        className,
      )}
    >
      <div className="col-span-2 h-full">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0"
        />
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="h-4 w-full">
              <img
                src="https://lh3.googleusercontent.com/DaCtO2iCVrnM4IetKsTRCPKBn9N1VZzyWseCzR0TZ8vbM8rcoRaw4KoYjaA4NeB2hxVNCstucQ=h24-rw"
                alt="source"
                className="h-3 object-cover"
              />
            </div>
            <h3 className="text-sm font-medium text-gray-300 group-hover:underline sm:text-xl">
              {title}
            </h3>
          </div>
          <div className="mt-4 flex items-center gap-1 sm:mt-9">
            <div className="flex items-center gap-1 text-gray-400">
              <p className="font-googleSans text-xs font-medium">{date}</p>
            </div>
            {author && (
              <>
                <hr className="mx-1 my-0 h-[3px] w-[3px] shrink-0 rounded-[1.5px] border-[none] bg-[#c4c7c5]" />
                <p className="mt-0 font-googleSans text-xs font-medium text-gray-400">
                  {author}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <figure className="col-span-1">
        <img
          src={imgUrl}
          alt={title}
          className="h-24 w-48 rounded-2xl object-cover"
        />
      </figure>
    </article>
  );
}
