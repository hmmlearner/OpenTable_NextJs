function Images({images}:{images:string[]}) {
    return ( <div>
        <h1 className="text-3xl font-bold mt-10 mb-7 border-b pb-5">{images.length} photo{images.length > 1 ? "s" : ""}</h1>
        <div className="flex flex-wrap">
          {images.map(image => <img src={image} alt="" className="w-56 h-44 mr-1 mb-1"></img>)}
        
        </div>
      </div>
       );
}

export default Images;

/*<img src="https://resizer.otstatic.com/v2/photos/xlarge/3/52516586.webp" alt="" className="w-56 h-44 mr-1 mb-1"></img>
<img src="https://resizer.otstatic.com/v2/photos/xlarge/2/52621502.webp" alt="" className="w-56 h-44 mr-1 mb-1"></img>
<img src="https://resizer.otstatic.com/v2/photos/xlarge/2/52621506.webp" alt="" className="w-56 h-44 mr-1 mb-1"></img>
<img src="https://resizer.otstatic.com/v2/photos/xlarge/2/52621505.webp" alt="" className="w-56 h-44 mr-1 mb-1"></img>
<img src="https://resizer.otstatic.com/v2/photos/xlarge/2/52621507.webp" alt="" className="w-56 h-44 mr-1 mb-1"></img>
<img src="https://resizer.otstatic.com/v2/photos/xlarge/2/52621503.webp" alt="" className="w-56 h-44 mr-1 mb-1"></img>
<img src="https://resizer.otstatic.com/v2/photos/xlarge/2/52530150.webp" alt="" className="w-56 h-44 mr-1 mb-1"></img> */