import Search from 'components/search';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-[rgb(32,33,36)]">
      <div className="mx-auto max-w-screen-lg p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center">
            <h1 className="font-googleSansBold text-2xl text-gray-300 sm:text-3xl">
              NewsPulse
            </h1>
            <p className="mt-1.5 font-googleSans text-sm text-gray-500">
              Stay Informed, Stay Ahead
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:w-1/2">
            <Search />
          </div>
        </div>
      </div>
    </header>
  );
}
