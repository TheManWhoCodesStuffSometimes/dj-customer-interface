// Curated song database for The Cowboy Saloon
// Prioritized for line dancing, country bar atmosphere, and crowd favorites

export interface CuratedSong {
  title: string;
  artist: string;
  category: string;
  popularity: number; // 1-10, 10 being most popular
  searchTerms?: string[]; // Alternative spellings, nicknames
  description?: string;
}

export const curatedSongs: CuratedSong[] = [
  // Line Dance Favorites (Highest Priority)
  { title: "Boot Scootin' Boogie", artist: "Brooks & Dunn", category: "Line Dance", popularity: 10, searchTerms: ["boot scootin boogie", "boot scootin"] },
  { title: "Achy Breaky Heart", artist: "Billy Ray Cyrus", category: "Line Dance", popularity: 10, searchTerms: ["achy breaky", "achey brakey"] },
  { title: "Cotton Eye Joe", artist: "Rednex", category: "Line Dance", popularity: 10, searchTerms: ["cotton eyed joe", "cotton eye"] },
  { title: "Copperhead Road", artist: "Steve Earle", category: "Line Dance", popularity: 9, searchTerms: ["copper head road"] },
  { title: "Man! I Feel Like a Woman!", artist: "Shania Twain", category: "Line Dance", popularity: 10, searchTerms: ["man i feel like a woman", "feel like a woman", "lets go girls"] },
  { title: "Chattahoochee", artist: "Alan Jackson", category: "Line Dance", popularity: 9, searchTerms: ["chatahoochee", "chatahochee", "tush push"] },
  { title: "Watermelon Crawl", artist: "Tracy Byrd", category: "Line Dance", popularity: 8, searchTerms: ["watermelon crawl"] },
  { title: "Country Girl (Shake It for Me)", artist: "Luke Bryan", category: "Line Dance", popularity: 9, searchTerms: ["country girl shake it", "shake it for me"] },
  { title: "Fake ID", artist: "Big & Rich", category: "Line Dance", popularity: 8, searchTerms: ["fake id", "footloose"] },
  { title: "The Git Up", artist: "Blanco Brown", category: "Line Dance", popularity: 9, searchTerms: ["git up", "get up"] },
  { title: "Wagon Wheel", artist: "Darius Rucker", category: "Line Dance", popularity: 10, searchTerms: ["waggon wheel", "rock me mama"] },
  { title: "Should've Been a Cowboy", artist: "Toby Keith", category: "Line Dance", popularity: 8, searchTerms: ["shouldve been a cowboy", "should have been a cowboy"] },
  { title: "Electric Slide", artist: "Marcia Griffiths", category: "Line Dance", popularity: 10, searchTerms: ["electric boogie", "electric slide"] },
  { title: "Cupid Shuffle", artist: "Cupid", category: "Line Dance", popularity: 9, searchTerms: ["cupid shuffle", "to the right"] },
  { title: "Footloose", artist: "Kenny Loggins", category: "Line Dance", popularity: 9, searchTerms: ["foot loose"] },
  
  // Country Sing-Along Anthems
  { title: "Friends in Low Places", artist: "Garth Brooks", category: "Sing-Along", popularity: 10, searchTerms: ["friends in low places", "blame it all on my roots"] },
  { title: "Take Me Home, Country Roads", artist: "John Denver", category: "Sing-Along", popularity: 10, searchTerms: ["take me home country roads", "country roads", "west virginia"] },
  { title: "Fishin' in the Dark", artist: "Nitty Gritty Dirt Band", category: "Sing-Along", popularity: 9, searchTerms: ["fishing in the dark", "fishin in the dark"] },
  { title: "Family Tradition", artist: "Hank Williams Jr.", category: "Sing-Along", popularity: 9, searchTerms: ["family tradition", "why do you drink"] },
  { title: "The Gambler", artist: "Kenny Rogers", category: "Sing-Along", popularity: 9, searchTerms: ["gambler", "know when to hold em", "know when to fold em"] },
  { title: "Dixieland Delight", artist: "Alabama", category: "Sing-Along", popularity: 8, searchTerms: ["dixieland delight"] },
  { title: "Chicken Fried", artist: "Zac Brown Band", category: "Sing-Along", popularity: 9, searchTerms: ["chicken fried", "cold beer"] },
  { title: "God Bless the U.S.A.", artist: "Lee Greenwood", category: "Sing-Along", popularity: 8, searchTerms: ["god bless the usa", "proud to be an american"] },
  { title: "On the Road Again", artist: "Willie Nelson", category: "Sing-Along", popularity: 9, searchTerms: ["on the road again"] },
  { title: "Sweet Home Alabama", artist: "Lynyrd Skynyrd", category: "Sing-Along", popularity: 10, searchTerms: ["sweet home alabama", "where the skies are blue"] },
  
  // Two-Step & Partner Dance
  { title: "All My Ex's Live in Texas", artist: "George Strait", category: "Two-Step", popularity: 9, searchTerms: ["all my exs live in texas", "all my exes live in texas"] },
  { title: "Neon Moon", artist: "Brooks & Dunn", category: "Two-Step", popularity: 9, searchTerms: ["neon moon", "when the sun goes down"] },
  { title: "Two of a Kind, Workin' on a Full House", artist: "Garth Brooks", category: "Two-Step", popularity: 8, searchTerms: ["two of a kind", "full house"] },
  { title: "Amarillo By Morning", artist: "George Strait", category: "Two-Step", popularity: 8, searchTerms: ["amarillo by morning", "amarillo morning"] },
  { title: "Silver Wings", artist: "Merle Haggard", category: "Two-Step", popularity: 7, searchTerms: ["silver wings"] },
  { title: "Good Hearted Woman", artist: "Waylon Jennings & Willie Nelson", category: "Two-Step", popularity: 8, searchTerms: ["good hearted woman"] },
  
  // Modern Country Hits
  { title: "Beer Never Broke My Heart", artist: "Luke Combs", category: "Modern", popularity: 10, searchTerms: ["beer never broke my heart"] },
  { title: "Body Like a Back Road", artist: "Sam Hunt", category: "Modern", popularity: 9, searchTerms: ["body like a back road", "back road"] },
  { title: "Tennessee Whiskey", artist: "Chris Stapleton", category: "Modern", popularity: 10, searchTerms: ["tennessee whiskey", "tennesee whiskey"] },
  { title: "Cruise", artist: "Florida Georgia Line", category: "Modern", popularity: 9, searchTerms: ["cruise", "baby you a song"] },
  { title: "Save a Horse (Ride a Cowboy)", artist: "Big & Rich", category: "Modern", popularity: 8, searchTerms: ["save a horse ride a cowboy", "ride a cowboy"] },
  { title: "Before He Cheats", artist: "Carrie Underwood", category: "Modern", popularity: 9, searchTerms: ["before he cheats", "right next time"] },
  { title: "Drunk on a Plane", artist: "Dierks Bentley", category: "Modern", popularity: 8, searchTerms: ["drunk on a plane"] },
  { title: "House Party", artist: "Sam Hunt", category: "Modern", popularity: 8, searchTerms: ["house party", "homebody"] },
  { title: "Head Over Boots", artist: "Jon Pardi", category: "Modern", popularity: 8, searchTerms: ["head over boots"] },
  { title: "Tequila", artist: "Dan + Shay", category: "Modern", popularity: 9, searchTerms: ["tequila", "when i drink"] },
  
  // Classic Country Bar Staples
  { title: "Jolene", artist: "Dolly Parton", category: "Classic", popularity: 10, searchTerms: ["jolene"] },
  { title: "Whiskey Bent and Hell Bound", artist: "Hank Williams Jr.", category: "Classic", popularity: 8, searchTerms: ["whiskey bent and hell bound"] },
  { title: "Mama Tried", artist: "Merle Haggard", category: "Classic", popularity: 8, searchTerms: ["mama tried"] },
  { title: "Luckenbach, Texas", artist: "Waylon Jennings", category: "Classic", popularity: 8, searchTerms: ["luckenbach texas", "back to the basics"] },
  { title: "The Fireman", artist: "George Strait", category: "Classic", popularity: 7, searchTerms: ["fireman"] },
  { title: "Elvira", artist: "The Oak Ridge Boys", category: "Classic", popularity: 8, searchTerms: ["elvira", "oom poppa mow mow"] },
  { title: "Tulsa Time", artist: "Don Williams", category: "Classic", popularity: 7, searchTerms: ["tulsa time"] },
  { title: "Ring of Fire", artist: "Johnny Cash", category: "Classic", popularity: 9, searchTerms: ["ring of fire", "burning ring of fire"] },
  { title: "He Stopped Loving Her Today", artist: "George Jones", category: "Classic", popularity: 8, searchTerms: ["he stopped loving her today"] },
  { title: "Folsom Prison Blues", artist: "Johnny Cash", category: "Classic", popularity: 9, searchTerms: ["folsom prison blues", "shot a man in reno"] },
  
  // Drinking Songs & Party Anthems
  { title: "Alcohol", artist: "Brad Paisley", category: "Drinking", popularity: 9, searchTerms: ["alcohol", "make anybody pretty"] },
  { title: "It's Five O'Clock Somewhere", artist: "Alan Jackson & Jimmy Buffett", category: "Drinking", popularity: 9, searchTerms: ["five oclock somewhere", "5 oclock somewhere"] },
  { title: "Drink in My Hand", artist: "Eric Church", category: "Drinking", popularity: 8, searchTerms: ["drink in my hand"] },
  { title: "Red Solo Cup", artist: "Toby Keith", category: "Drinking", popularity: 9, searchTerms: ["red solo cup", "party cup"] },
  { title: "Tequila Makes Her Clothes Fall Off", artist: "Joe Nichols", category: "Drinking", popularity: 8, searchTerms: ["tequila makes her clothes fall off"] },
  { title: "Ten Rounds with José Cuervo", artist: "Tracy Byrd", category: "Drinking", popularity: 8, searchTerms: ["ten rounds jose cuervo", "jose cuervo"] },
  { title: "Whiskey River", artist: "Willie Nelson", category: "Drinking", popularity: 8, searchTerms: ["whiskey river"] },
  { title: "When It Rains It Pours", artist: "Luke Combs", category: "Drinking", popularity: 9, searchTerms: ["when it rains it pours"] },
  
  // Slow Dance & Heartbreak Ballads
  { title: "Amazed", artist: "Lonestar", category: "Slow Dance", popularity: 9, searchTerms: ["amazed", "every little thing"] },
  { title: "The Dance", artist: "Garth Brooks", category: "Slow Dance", popularity: 9, searchTerms: ["the dance", "missed the pain"] },
  { title: "Remember When", artist: "Alan Jackson", category: "Slow Dance", popularity: 8, searchTerms: ["remember when"] },
  { title: "Need You Now", artist: "Lady A", category: "Slow Dance", popularity: 9, searchTerms: ["need you now", "quarter after one"] },
  { title: "Always On My Mind", artist: "Willie Nelson", category: "Slow Dance", popularity: 8, searchTerms: ["always on my mind"] },
  { title: "Forever and Ever, Amen", artist: "Randy Travis", category: "Slow Dance", popularity: 8, searchTerms: ["forever and ever amen"] },
  { title: "Stand by Your Man", artist: "Tammy Wynette", category: "Slow Dance", popularity: 7, searchTerms: ["stand by your man"] },
  
  // Crossover Rock/Pop Favorites
  { title: "Sweet Caroline", artist: "Neil Diamond", category: "Crossover", popularity: 10, searchTerms: ["sweet caroline", "so good so good"] },
  { title: "Don't Stop Believin'", artist: "Journey", category: "Crossover", popularity: 10, searchTerms: ["dont stop believin", "small town girl"] },
  { title: "Livin' on a Prayer", artist: "Bon Jovi", category: "Crossover", popularity: 9, searchTerms: ["livin on a prayer", "halfway there"] },
  { title: "You Shook Me All Night Long", artist: "AC/DC", category: "Crossover", popularity: 8, searchTerms: ["you shook me all night long"] },
  { title: "Pour Some Sugar on Me", artist: "Def Leppard", category: "Crossover", popularity: 8, searchTerms: ["pour some sugar on me"] },
  { title: "All Summer Long", artist: "Kid Rock", category: "Crossover", popularity: 8, searchTerms: ["all summer long"] },
  { title: "Honky Tonk Women", artist: "The Rolling Stones", category: "Crossover", popularity: 7, searchTerms: ["honky tonk women"] },
  { title: "Take It Easy", artist: "Eagles", category: "Crossover", popularity: 8, searchTerms: ["take it easy", "running down the road"] },
  { title: "Piano Man", artist: "Billy Joel", category: "Crossover", popularity: 9, searchTerms: ["piano man", "sing us a song"] },
  { title: "Free Fallin'", artist: "Tom Petty", category: "Crossover", popularity: 8, searchTerms: ["free fallin", "free falling"] },

  // Additional Country Favorites
  { title: "Country Boy Can Survive", artist: "Hank Williams Jr.", category: "Sing-Along", popularity: 8, searchTerms: ["country boy can survive"] },
  { title: "Redneck Woman", artist: "Gretchen Wilson", category: "Sing-Along", popularity: 8, searchTerms: ["redneck woman", "hell yeah"] },
  { title: "Drinkin' Problem", artist: "Midland", category: "Drinking", popularity: 8, searchTerms: ["drinkin problem", "drinking problem"] },
  { title: "You Never Even Called Me by My Name", artist: "David Allan Coe", category: "Sing-Along", popularity: 7, searchTerms: ["perfect country song"] },
  { title: "Louisiana Saturday Night", artist: "Mel McDaniel", category: "Sing-Along", popularity: 7, searchTerms: ["louisiana saturday night"] },
  { title: "Mountain Music", artist: "Alabama", category: "Classic", popularity: 8, searchTerms: ["mountain music"] },
  { title: "Rocky Top", artist: "Osborne Brothers", category: "Classic", popularity: 8, searchTerms: ["rocky top"] },
  { title: "9 to 5", artist: "Dolly Parton", category: "Classic", popularity: 8, searchTerms: ["nine to five", "working nine to five"] },
  { title: "Mama Don't Let Your Babies Grow Up to Be Cowboys", artist: "Waylon & Willie", category: "Classic", popularity: 8, searchTerms: ["mama dont let your babies", "grow up to be cowboys"] },
  { title: "Working Man Blues", artist: "Merle Haggard", category: "Classic", popularity: 7, searchTerms: ["working man blues"] },
  { title: "Cowboy Take Me Away", artist: "The Chicks", category: "Classic", popularity: 8, searchTerms: ["cowboy take me away", "dixie chicks"] },
  { title: "5-1-5-0", artist: "Dierks Bentley", category: "Line Dance", popularity: 7, searchTerms: ["5150", "call the po po"] },
  { title: "Good Time", artist: "Alan Jackson", category: "Line Dance", popularity: 8, searchTerms: ["good time"] },
  { title: "Honky Tonk Badonkadonk", artist: "Trace Adkins", category: "Line Dance", popularity: 8, searchTerms: ["honky tonk badonkadonk", "badonkadonk"] },
  { title: "Any Man of Mine", artist: "Shania Twain", category: "Line Dance", popularity: 8, searchTerms: ["any man of mine"] },
  { title: "Two Step", artist: "Laura Bell Bundy", category: "Line Dance", popularity: 7, searchTerms: ["two step", "1 2 3 4"] },
  { title: "A Bar Song (Tipsy)", artist: "Shaboozey", category: "Line Dance", popularity: 9, searchTerms: ["bar song tipsy", "tipsy"] },
  { title: "Austin (Boots Stop Workin')", artist: "Dasha", category: "Line Dance", popularity: 8, searchTerms: ["austin boots stop workin", "boots stop working"] },
  { title: "One Margarita", artist: "Luke Bryan", category: "Modern", popularity: 8, searchTerms: ["one margarita"] },
  { title: "Heartache Medication", artist: "Jon Pardi", category: "Modern", popularity: 8, searchTerms: ["heartache medication"] },
  { title: "Buy Me a Boat", artist: "Chris Janson", category: "Modern", popularity: 8, searchTerms: ["buy me a boat"] },
  { title: "Beer For My Horses", artist: "Toby Keith & Willie Nelson", category: "Modern", popularity: 8, searchTerms: ["beer for my horses"] },
  { title: "She Had Me at Heads Carolina", artist: "Cole Swindell", category: "Modern", popularity: 9, searchTerms: ["she had me at heads carolina", "heads carolina"] },
  { title: "Last Night", artist: "Morgan Wallen", category: "Modern", popularity: 10, searchTerms: ["last night", "let the liquor talk"] },
  { title: "Guitars, Cadillacs", artist: "Dwight Yoakam", category: "Two-Step", popularity: 8, searchTerms: ["guitars cadillacs"] },
  { title: "Sold (Grundy County Auction)", artist: "John Michael Montgomery", category: "Two-Step", popularity: 7, searchTerms: ["sold grundy county", "grundy county auction"] },
  { title: "My Maria", artist: "Brooks & Dunn", category: "Two-Step", popularity: 8, searchTerms: ["my maria"] },
  { title: "Heartache on the Dance Floor", artist: "Jon Pardi", category: "Two-Step", popularity: 8, searchTerms: ["heartache on the dance floor"] },
  { title: "Barefoot Blue Jean Night", artist: "Jake Owen", category: "Two-Step", popularity: 8, searchTerms: ["barefoot blue jean night"] },
  { title: "T-R-O-U-B-L-E", artist: "Travis Tritt", category: "Two-Step", popularity: 7, searchTerms: ["trouble", "t r o u b l e"] },
  { title: "Heads Carolina, Tails California", artist: "Jo Dee Messina", category: "Two-Step", popularity: 8, searchTerms: ["heads carolina tails california"] },
  { title: "Pontoon", artist: "Little Big Town", category: "Two-Step", popularity: 8, searchTerms: ["pontoon", "motorboatin"] },
  { title: "Dance the Night Away", artist: "The Mavericks", category: "Two-Step", popularity: 7, searchTerms: ["dance the night away"] },
  { title: "All My Rowdy Friends Are Comin' Over Tonight", artist: "Hank Williams Jr.", category: "Drinking", popularity: 8, searchTerms: ["all my rowdy friends", "monday night football"] },
  { title: "Bartender", artist: "Lady A", category: "Drinking", popularity: 8, searchTerms: ["bartender", "pour me a drink"] },
  { title: "Toes", artist: "Zac Brown Band", category: "Drinking", popularity: 8, searchTerms: ["toes", "toes in the water"] },
  { title: "Margaritaville", artist: "Jimmy Buffett", category: "Drinking", popularity: 9, searchTerms: ["margaritaville", "wasted away"] },
  { title: "Here's a Quarter (Call Someone Who Cares)", artist: "Travis Tritt", category: "Drinking", popularity: 7, searchTerms: ["heres a quarter", "call someone who cares"] },
  { title: "Cowgirls Don't Cry", artist: "Brooks & Dunn", category: "Slow Dance", popularity: 8, searchTerms: ["cowgirls dont cry"] },
  { title: "You Look So Good in Love", artist: "George Strait", category: "Slow Dance", popularity: 8, searchTerms: ["you look so good in love"] },
  { title: "Anymore", artist: "Travis Tritt", category: "Slow Dance", popularity: 7, searchTerms: ["anymore"] },
  { title: "I Cross My Heart", artist: "George Strait", category: "Slow Dance", popularity: 8, searchTerms: ["i cross my heart"] },
  { title: "In Case You Didn't Know", artist: "Brett Young", category: "Slow Dance", popularity: 8, searchTerms: ["in case you didnt know"] },
  { title: "Cover Me Up", artist: "Morgan Wallen", category: "Slow Dance", popularity: 8, searchTerms: ["cover me up"] },
  { title: "Holes in the Floor of Heaven", artist: "Steve Wariner", category: "Slow Dance", popularity: 7, searchTerms: ["holes in the floor of heaven"] },
  { title: "Tin Man", artist: "Miranda Lambert", category: "Slow Dance", popularity: 7, searchTerms: ["tin man"] },
  { title: "Paradise City", artist: "Guns N' Roses", category: "Crossover", popularity: 8, searchTerms: ["paradise city", "take me down"] },
  { title: "Brown Eyed Girl", artist: "Van Morrison", category: "Crossover", popularity: 8, searchTerms: ["brown eyed girl"] },
  { title: "Simple Man", artist: "Lynyrd Skynyrd", category: "Crossover", popularity: 8, searchTerms: ["simple man"] },
  { title: "The Joker", artist: "Steve Miller Band", category: "Crossover", popularity: 8, searchTerms: ["the joker", "picker grinner"] },
  { title: "Closing Time", artist: "Semisonic", category: "Crossover", popularity: 8, searchTerms: ["closing time", "you dont have to go home"] }
];

export default curatedSongs;
