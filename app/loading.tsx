import Header from './components/Header';

function Loading() {
    return (     <main>
        <Header />
        <div className="flex flex-wrap bg-white mt-10 py-3 px-36"> 
        {[1,2,3,4,5,6,7,8,9,10,11,12].map((num)=>(
            <div className="animate-pulse bg-slate-200 w-64 h-72 rounded overflow-hidden cursor-pointer border p-3"></div>
        ))}
        </div>
    </main>
        );
}

export default Loading;