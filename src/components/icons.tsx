
const icons: any = {
    home : "icons/home.png",
    wave: "icons/wave.png",
    search: "icons/search.png",
    trend: "icons/star.png",
    stack: "icons/stack.png",
    play: "icons/play.png",
    music: "icons/music.png",
    heart: '',
    tag: '',
    minor: '',
    profile: '',
}

//@ts-ignore
function Icons({name, classname}) {
    var ico:string = icons[name]
    return ( <>
 
    <img src={ico} className={classname}></img>
 

    </> );
}

export default Icons;