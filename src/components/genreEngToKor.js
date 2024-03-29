// const genre_list = ["romance", "bl", "gl", "drama", "daily", "action", "gag", "fantasy", 
// "thrill+horror", "historical", "sports", "sensibility", "school", "erotic"]
// const genre_list_kor = ["로맨스", "BL", "GL", "드라마", "일상", "액션", "개그", "판타지", 
//     "스릴/공포", "무협", "스포츠", "감성", "학교", "에로"]


const genreListDict = {
    "romance" : "로맨스",
    "drama": "드라마",
    "daily": "일상",
    "sensibility": "감성",
    "gag" : "개그",
    "fantasy": "판타지",
    "thrill+horror": "스릴/공포",
    "action": "액션",
    "historical": "무협",
    "school": "학원",
    "sports": "스포츠",
    "bl": "BL",
    "gl": "GL",
    "erotic": "에로",
    }

const dayListKor = ["월","화","수","목","금","토","일","연재","완결","열흘", "비정기"]


function genreEngToKor(genre) {
    return genreListDict[genre]
}

export default genreEngToKor
export let genreOrderList = ["romance", "drama", "daily", "sensibility", "gag", "fantasy", "thrill+horror", "action", "historical", "school", "sports",  "bl", "gl", "erotic"]
export let platformOrderList = ["toptoon", "naver", "kakao_webtoon", "lezhin", "toomics", "ktoon", "bomtoon", "mrblue",  "onestory", ]
export let dateOrderList = ["월","화","수","목","금","토","일", "열흘", "비정기", "완결"]