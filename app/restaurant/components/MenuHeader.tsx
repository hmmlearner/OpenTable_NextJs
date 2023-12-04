export default function MenuHeader({title}:{title:string}){
  const renderTitle = () => {
    //return title.split('-').join(' ');
    const titleWords = title.split('-');
    titleWords[titleWords.length-1] = `(${titleWords[titleWords.length-1]})`;
    return titleWords.join(' ');
  }

    return(
        <div className="h-96 overflow-hidden">
        <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
          <h1 className="text-7xl text-white capitalize text-shadow text-center">
            {renderTitle()}
          </h1>
        </div>
      </div>
    );
}