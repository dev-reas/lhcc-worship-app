export interface SongStructure {
  type: 'intro' | 'verse' | 'chorus' | 'bridge' | 'outro'
  label: string
  startLine: number
  endLine: number
}

export interface Song {
  id: string
  title: string
  artist: string
  key: string
  bpm: number
  lyrics: string
  chordChart: string
  nashvilleChart: string
  structure: SongStructure[]
  createdAt: string
  updatedAt: string
}

const now = '2026-07-14T00:00:00.000Z'

export const seedData: Song[] = [
  {
    id: 'song-001',
    title: 'Amazing Grace',
    artist: 'John Newton',
    key: 'G',
    bpm: 72,
    lyrics: '',
    chordChart: `{title: Amazing Grace}
{artist: John Newton}
{key: G}
{tempo: 72}

{start_of_intro}
[G] [C] [G] [D]
{end_of_intro}

{start_of_verse: Verse 1}
[G]Amazing [C]grace, how [G]sweet the [D]sound
That [C]saved a [G]wretch like [D]me
I [G]once was [C]lost, but [G]now am [D]found
Was [C]blind but [G]now I [D]see
{end_of_verse}

{start_of_verse: Verse 2}
'Twas [C]grace that [G]taught my [D]heart to [G]fear
And [C]grace my [G]fears re-[D]lieved
How [G]precious [C]did that [G]grace ap-[D]pear
The [C]hour I [G]first be-[D]lieved
{end_of_verse}

{start_of_chorus}
[G]Chains are [C]gone, I've been [G]set [D]free
My [C]God, my [G]Savior has [D]ran-[G]somed me
And [C]like a [G]flood His [D]mercy [C]reigns
Un-[G]ending [D]love, a-[G]mazing [D]grace
{end_of_chorus}

{start_of_verse: Verse 3}
The [C]Lord has [G]promised [D]good to [G]me
His [C]word my [G]hope se-[D]cures
He [G]will my [C]shield and [G]portion [D]be
As [C]long as [G]life en-[D]dures
{end_of_verse}

{start_of_outro}
[G] [C] [G] [D]
{end_of_outro}`,
    nashvilleChart: '',
    structure: [
      { type: 'intro', label: 'Intro', startLine: 5, endLine: 6 },
      { type: 'verse', label: 'Verse 1', startLine: 8, endLine: 12 },
      { type: 'verse', label: 'Verse 2', startLine: 14, endLine: 18 },
      { type: 'chorus', label: 'Chorus', startLine: 20, endLine: 25 },
      { type: 'verse', label: 'Verse 3', startLine: 27, endLine: 31 },
      { type: 'outro', label: 'Outro', startLine: 33, endLine: 34 },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'song-002',
    title: 'How Great Is Our God',
    artist: 'Chris Tomlin',
    key: 'G',
    bpm: 80,
    lyrics: '',
    chordChart: `{title: How Great Is Our God}
{artist: Chris Tomlin}
{key: G}
{tempo: 80}

{start_of_intro}
[Em] [C] [G] [D]
{end_of_intro}

{start_of_verse: Verse 1}
[Em]The [C]splendor of a [G]King
Clothed in [D]majesty
Let all the [Em]earth re-[C]joice
All the [G]earth re-[D]joice
He [Em]wraps Him-[C]self in [G]light
And dark-[D]ness tries to hide
And [Em]trembles at His [C]voice
And [G]trembles at His [D]voice
{end_of_verse}

{start_of_chorus}
How [C]great is our [G]God
Sing with [D]me, how [Em]great is our [G]God
And all will [C]see how [G]great, how [D]great
Is our [G]God
{end_of_chorus}

{start_of_verse: Verse 2}
[Em]Age to [C]age He [G]stands
And [D]time is in His hands
The [Em]begin-[C]ning and the [G]end
The [D]beginning and the [G]end
The [Em]Godhead [C]three in [G]one
The [D]Father, Spirit, Son
The [Em]Lion and the [C]Lamb
The [G]Lion and the [D]Lamb
{end_of_verse}

{start_of_bridge}
Name a-[C]bove all [G]names
Worthy of all [D]praise
My heart will [C]sing how [G]great is our [D]God
{end_of_bridge}

{start_of_outro}
[Em] [C] [G] [D]
{end_of_outro}`,
    nashvilleChart: '',
    structure: [
      { type: 'intro', label: 'Intro', startLine: 5, endLine: 6 },
      { type: 'verse', label: 'Verse 1', startLine: 8, endLine: 17 },
      { type: 'chorus', label: 'Chorus', startLine: 19, endLine: 23 },
      { type: 'verse', label: 'Verse 2', startLine: 25, endLine: 34 },
      { type: 'bridge', label: 'Bridge', startLine: 36, endLine: 40 },
      { type: 'outro', label: 'Outro', startLine: 42, endLine: 43 },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'song-003',
    title: '10,000 Reasons (Bless the Lord)',
    artist: 'Matt Redman',
    key: 'G',
    bpm: 72,
    lyrics: '',
    chordChart: `{title: 10,000 Reasons (Bless the Lord)}
{artist: Matt Redman}
{key: G}
{tempo: 72}

{start_of_intro}
[G] [Em] [C] [D]
{end_of_intro}

{start_of_verse: Verse 1}
[Em]Bless the [C]Lord, O my [G]soul
O my [D]soul
Worship His [Em]holy [C]name
Sing like [G]never be-[D]fore
O my [Em]soul
I'll [C]worship Your ho-[G]ly [D]name
{end_of_verse}

{start_of_chorus}
The [C]sun comes [G]up, it's a new [D]day dawning
It's time to [C]sing Your song a-[G]gain
What-[D]ever may [Em]pass and what-[C]ever lies be-[G]fore
Let me be [C]singing when the [D]evening comes
{end_of_chorus}

{start_of_verse: Verse 2}
[Em]You're rich in [C]love and You're [G]slow to [D]anger
You're [Em]kind to [C]all that You've [G]cre-[D]ated
And [Em]all the [C]works of Your [G]hands
Will [D]sing of Your praise
{end_of_verse}

{start_of_chorus}
The [C]sun comes [G]up, it's a new [D]day dawning
It's time to [C]sing Your song a-[G]gain
What-[D]ever may [Em]pass and what-[C]ever lies be-[G]fore
Let me be [C]singing when the [D]evening comes
{end_of_chorus}

{start_of_bridge}
Ten [C]thousand [G]reasons for my [D]heart to [Em]find
Ten [C]thousand [G]reasons for my [D]heart to [G]find
{end_of_bridge}

{start_of_verse: Verse 3}
And on that [Em]day when my [C]strength is [G]failing
The [D]end draws near and my [Em]time has [C]come
Still my [G]soul will [D]sing Your praise un-[G]ending
Ten [C]thousand [G]years and then [D]forever-[G]more
{end_of_verse}

{start_of_outro}
[G] [Em] [C] [D]
{end_of_outro}`,
    nashvilleChart: '',
    structure: [
      { type: 'intro', label: 'Intro', startLine: 5, endLine: 6 },
      { type: 'verse', label: 'Verse 1', startLine: 8, endLine: 15 },
      { type: 'chorus', label: 'Chorus', startLine: 17, endLine: 21 },
      { type: 'verse', label: 'Verse 2', startLine: 23, endLine: 29 },
      { type: 'chorus', label: 'Chorus', startLine: 31, endLine: 35 },
      { type: 'bridge', label: 'Bridge', startLine: 37, endLine: 40 },
      { type: 'verse', label: 'Verse 3', startLine: 42, endLine: 49 },
      { type: 'outro', label: 'Outro', startLine: 51, endLine: 52 },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'song-004',
    title: 'Oceans (Where Feet May Fail)',
    artist: 'Hillsong UNITED',
    key: 'D',
    bpm: 68,
    lyrics: '',
    chordChart: `{title: Oceans (Where Feet May Fail)}
{artist: Hillsong UNITED}
{key: D}
{tempo: 68}

{start_of_intro}
[D] [G] [D] [A]
{end_of_intro}

{start_of_verse: Verse 1}
You [D]call me out [G]upon the [D]waters
The great un-[A]known where feet may [D]fail
And [G]there I'll [D]find You in the [A]mystery
In [D]ocean [G]deep, my faith will [D]stand
{end_of_verse}

{start_of_chorus}
Spirit [G]lead me where my [D]trust is without [A]borders
Let me [G]walk upon the [D]waters
Where-[A]ever You would [Bm]call me
Take me [G]deeper than my [D]feet could ever [A]wander
And my [G]faith will be made [D]stronger
In the [A]presence of my [Bm]Savior
{end_of_chorus}

{start_of_verse: Verse 2}
Your [D]grace a-[G]bounds in deep-[D]est [A]waters
Your sov-[D]ereign hand will be my [G]guide
Where [D]feet may fail and fear sur-[A]rounds me
You've [D]never [G]failed and You won't [D]start now
{end_of_verse}

{start_of_chorus}
Spirit [G]lead me where my [D]trust is without [A]borders
Let me [G]walk upon the [D]waters
Where-[A]ever You would [Bm]call me
Take me [G]deeper than my [D]feet could ever [A]wander
And my [G]faith will be made [D]stronger
In the [A]presence of my [Bm]Savior
{end_of_chorus}

{start_of_bridge}
[Bm]I will [G]call upon Your [D]name
Keep my [A]eyes a-[Bm]bove the [G]waves
When o-[D]ceans [A]rise
My soul will [G]rest in Your [D]embrace
For I am [A]Yours and [Bm]You are [G]mine
{end_of_bridge}

{start_of_outro}
[D] [G] [D] [A]
{end_of_outro}`,
    nashvilleChart: '',
    structure: [
      { type: 'intro', label: 'Intro', startLine: 5, endLine: 6 },
      { type: 'verse', label: 'Verse 1', startLine: 8, endLine: 12 },
      { type: 'chorus', label: 'Chorus', startLine: 14, endLine: 21 },
      { type: 'verse', label: 'Verse 2', startLine: 23, endLine: 27 },
      { type: 'chorus', label: 'Chorus', startLine: 29, endLine: 36 },
      { type: 'bridge', label: 'Bridge', startLine: 38, endLine: 43 },
      { type: 'outro', label: 'Outro', startLine: 45, endLine: 46 },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'song-005',
    title: 'Reckless Love',
    artist: 'Cory Asbury',
    key: 'G',
    bpm: 74,
    lyrics: '',
    chordChart: `{title: Reckless Love}
{artist: Cory Asbury}
{key: G}
{tempo: 74}

{start_of_intro}
[Em] [C] [G] [D]
{end_of_intro}

{start_of_verse: Verse 1}
[Em]Before I [C]spoke a [G]word
You were [D]singing o-[Em]ver [C]me
You have [G]been so, so [D]good to [G]me
Before I [Em]took a [C]breath
You breathed Your [D]life in-[Em]to [C]me
You have [G]been so, so [D]good to [G]me
{end_of_verse}

{start_of_chorus}
Oh the [C]overwhelm-[G]ing, never-[D]ending, re-[Em]ckless [C]love of [G]God
Oh it [C]chases me [G]down, fights till [D]I'm found
Leaves the [C]ninety-[G]nine
And I couldn't [Em]earn it, I don't [C]deserve it
Still You [G]give Your-[D]self a-[G]way
{end_of_chorus}

{start_of_verse: Verse 2}
When I was [Em]your foe, still Your [C]love fought for [G]me
You have [D]been so, so [G]good to [G]me
When I felt [Em]no worth, You paid it [C]all for [G]me
You have [D]been so, so [D]good to [G]me
{end_of_verse}

{start_of_chorus}
Oh the [C]overwhelm-[G]ing, never-[D]ending, re-[Em]ckless [C]love of [G]God
Oh it [C]chases me [G]down, fights till [D]I'm found
Leaves the [C]ninety-[G]nine
And I couldn't [Em]earn it, I don't [C]deserve it
Still You [G]give Your-[D]self a-[G]way
{end_of_chorus}

{start_of_bridge}
There's no [C]wall You won't kick [G]down
Lie You won't [D]tear [Em]down
Com-[C]ing after [G]me
There's no [D]shore You won't [G]wash a-[C]way
[D]Lie You won't [G]tear [Em]down
Com-[C]ing after [G]me
{end_of_bridge}

{start_of_outro}
[Em] [C] [G] [D]
{end_of_outro}`,
    nashvilleChart: '',
    structure: [
      { type: 'intro', label: 'Intro', startLine: 5, endLine: 6 },
      { type: 'verse', label: 'Verse 1', startLine: 8, endLine: 17 },
      { type: 'chorus', label: 'Chorus', startLine: 19, endLine: 26 },
      { type: 'verse', label: 'Verse 2', startLine: 28, endLine: 33 },
      { type: 'chorus', label: 'Chorus', startLine: 35, endLine: 42 },
      { type: 'bridge', label: 'Bridge', startLine: 44, endLine: 51 },
      { type: 'outro', label: 'Outro', startLine: 53, endLine: 54 },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'song-006',
    title: 'Good Good Father',
    artist: 'Chris Tomlin',
    key: 'G',
    bpm: 78,
    lyrics: '',
    chordChart: `{title: Good Good Father}
{artist: Chris Tomlin}
{key: G}
{tempo: 78}

{start_of_intro}
[Em] [C] [G] [D]
{end_of_intro}

{start_of_verse: Verse 1}
[Em]I've heard a [C]thousand sto-[G]ries
Of what they [D]think You're like
And I've heard the [Em]tender [C]whispers
Of love in the [D]dead of night
And You tell me [Em]that You're pleased and that [C]I'm never a-[G]lone
{end_of_verse}

{start_of_chorus}
You're a [C]good, good [G]Father
It's who You [D]are, it's who You [Em]are
It's who You [C]are
And I'm [C]loved by [G]you
It's who I [D]am, it's who I [Em]am
It's who I [C]am
{end_of_chorus}

{start_of_verse: Verse 2}
I've seen many [C]searching for [G]answers
Far and [D]wide
But I know we're all [Em]searching for [C]answers
Only You [D]provide 'cause You know
Just what we [Em]need before we [C]say a [G]word
{end_of_verse}

{start_of_chorus}
You're a [C]good, good [G]Father
It's who You [D]are, it's who You [Em]are
It's who You [C]are
And I'm [C]loved by [G]you
It's who I [D]am, it's who I [Em]am
It's who I [C]am
{end_of_chorus}

{start_of_bridge}
[C]Perfect in all [G]of Your [D]ways
You are [Em]perfect in all [C]of Your [G]ways
You are [D]perfect in all [C]of Your [D]ways
{end_of_bridge}

{start_of_outro}
[Em] [C] [G] [D]
{end_of_outro}`,
    nashvilleChart: '',
    structure: [
      { type: 'intro', label: 'Intro', startLine: 5, endLine: 6 },
      { type: 'verse', label: 'Verse 1', startLine: 8, endLine: 14 },
      { type: 'chorus', label: 'Chorus', startLine: 16, endLine: 24 },
      { type: 'verse', label: 'Verse 2', startLine: 26, endLine: 33 },
      { type: 'chorus', label: 'Chorus', startLine: 35, endLine: 43 },
      { type: 'bridge', label: 'Bridge', startLine: 45, endLine: 48 },
      { type: 'outro', label: 'Outro', startLine: 50, endLine: 51 },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'song-007',
    title: 'What A Beautiful Name',
    artist: 'Hillsong Worship',
    key: 'D',
    bpm: 66,
    lyrics: '',
    chordChart: `{title: What A Beautiful Name}
{artist: Hillsong Worship}
{key: D}
{tempo: 66}

{start_of_intro}
[D] [A] [Bm] [G]
{end_of_intro}

{start_of_verse: Verse 1}
You were the [D]Word at the [A]beginning
One with [Bm]God, the Lord most [G]high
Your hidden [D]glory in [A]creation
Now re-[Bm]vealed in You our [G]Christ
{end_of_verse}

{start_of_chorus}
What a [A]beautiful [Bm]name it [G]is
The name of [D]Jesus [A]Christ my [Bm]King
What a [G]beautiful [D]name it [A]is
Nothing com-[Bm]pares to [G]this
What a [A]beautiful [Bm]name it [G]is
The name of [D]Jesus
{end_of_chorus}

{start_of_verse: Verse 2}
You didn't [D]want heaven with-[A]out us
So [Bm]Jesus, You brought [G]heaven [D]down
My sin was [D]great, Your love was [A]greater
What could [Bm]separate us [G]now
{end_of_verse}

{start_of_chorus}
What a [A]wonderful [Bm]name it [G]is
The name of [D]Jesus [A]Christ my [Bm]King
What a [G]wonderful [D]name it [A]is
Nothing com-[Bm]pares to [G]this
What a [A]wonderful [Bm]name it [G]is
The name of [D]Jesus
{end_of_chorus}

{start_of_bridge}
Death could not [A]hold You
The veil tore be-[Bm]fore You
You si-[G]lenced the boast of [D]sin and [A]grave
The [Bm]heavens are [G]roaning
The praise of Your [D]glory
For You are [A]risen to [D]life a-[A]gain
{end_of_bridge}

{start_of_chorus}
You have no [A]rival, You have no [Bm]equal
Now and for-[G]ever, God You [D]reign
Yours is the [A]kingdom, Yours is the [Bm]glory
Yours is the [G]name above all [D]names
{end_of_chorus}

{start_of_outro}
[D] [A] [Bm] [G]
{end_of_outro}`,
    nashvilleChart: '',
    structure: [
      { type: 'intro', label: 'Intro', startLine: 5, endLine: 6 },
      { type: 'verse', label: 'Verse 1', startLine: 8, endLine: 12 },
      { type: 'chorus', label: 'Chorus', startLine: 14, endLine: 22 },
      { type: 'verse', label: 'Verse 2', startLine: 24, endLine: 28 },
      { type: 'chorus', label: 'Chorus', startLine: 30, endLine: 38 },
      { type: 'bridge', label: 'Bridge', startLine: 40, endLine: 47 },
      { type: 'chorus', label: 'Final Chorus', startLine: 49, endLine: 53 },
      { type: 'outro', label: 'Outro', startLine: 55, endLine: 56 },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'song-008',
    title: 'Great Are You Lord',
    artist: 'All Sons & Daughters',
    key: 'A',
    bpm: 70,
    lyrics: '',
    chordChart: `{title: Great Are You Lord}
{artist: All Sons & Daughters}
{key: A}
{tempo: 70}

{start_of_intro}
[A] [D] [A] [E]
{end_of_intro}

{start_of_verse: Verse 1}
You give [D]life, You are [A]love
You bring [E]light to the [D]darkness
You give [D]hope, You re-[A]store
Every [E]heart that is [D]bro-[A]ken
And [D]great are You, [A]Lord
{end_of_verse}

{start_of_chorus}
It's Your [D]breath in our [A]lungs
So we [E]pour out our [D]praise
We pour [D]out our praise
It's Your [E]breath in our [A]lungs
So we [D]pour out our praise to [A]You [E]only
{end_of_chorus}

{start_of_verse: Verse 2}
You give [D]life, You are [A]love
You bring [E]light to the [D]darkness
You give [D]hope, You re-[A]store
Every [E]heart that is [D]bro-[A]ken
And [D]great are You, [A]Lord
{end_of_verse}

{start_of_chorus}
It's Your [D]breath in our [A]lungs
So we [E]pour out our [D]praise
We pour [D]out our praise
It's Your [E]breath in our [A]lungs
So we [D]pour out our praise to [A]You [E]only
{end_of_chorus}

{start_of_bridge}
And all the [A]earth will shout Your [E]praise
Our hearts will [D]cry, these bones will [A]sing
Great are You [D]Lord
{end_of_bridge}

{start_of_outro}
[A] [D] [A] [E]
{end_of_outro}`,
    nashvilleChart: '',
    structure: [
      { type: 'intro', label: 'Intro', startLine: 5, endLine: 6 },
      { type: 'verse', label: 'Verse 1', startLine: 8, endLine: 15 },
      { type: 'chorus', label: 'Chorus', startLine: 17, endLine: 24 },
      { type: 'verse', label: 'Verse 2', startLine: 26, endLine: 33 },
      { type: 'chorus', label: 'Chorus', startLine: 35, endLine: 42 },
      { type: 'bridge', label: 'Bridge', startLine: 44, endLine: 48 },
      { type: 'outro', label: 'Outro', startLine: 50, endLine: 51 },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'song-009',
    title: 'Build My Life',
    artist: 'Housefires',
    key: 'C',
    bpm: 72,
    lyrics: '',
    chordChart: `{title: Build My Life}
{artist: Housefires}
{key: C}
{tempo: 72}

{start_of_intro}
[C] [F] [Am] [G]
{end_of_intro}

{start_of_verse: Verse 1}
Worthy of [F]every song we could [Am]ever [G]sing
Worthy of [F]all the praise we could [Am]ever [G]bring
Worthy of [F]every breath we could [Am]ever [G]breathe
We live for [C]You
{end_of_verse}

{start_of_chorus}
Jesus, the [F]name above [Am]every [G]other name
Jesus, the [F]only one who could [Am]ever [G]save
Worthy of [F]every breath we could [Am]ever [G]breathe
We live for [C]You, oh we live for [F]You
{end_of_chorus}

{start_of_verse: Verse 2}
Holy, there is [F]no one like [Am]You
There is [G]none beside [F]You
Open up my [Am]eyes in won-[G]der
Show me who [F]You are and [Am]fill me with Your [G]heart
And lead me in Your [C]love to those a-[F]round
{end_of_verse}

{start_of_chorus}
Jesus, the [F]name above [Am]every [G]other name
Jesus, the [F]only one who could [Am]ever [G]save
Worthy of [F]every breath we could [Am]ever [G]breathe
We live for [C]You, oh we live for [F]You
{end_of_chorus}

{start_of_bridge}
I will [Am]build my life [G]upon Your [F]love
It is a [C]firm foun-[F]dation
I will [Am]put my trust in [G]You a-[F]lone
And I will [C]not be [F]shaken
{end_of_bridge}

{start_of_outro}
[C] [F] [Am] [G]
{end_of_outro}`,
    nashvilleChart: '',
    structure: [
      { type: 'intro', label: 'Intro', startLine: 5, endLine: 6 },
      { type: 'verse', label: 'Verse 1', startLine: 8, endLine: 13 },
      { type: 'chorus', label: 'Chorus', startLine: 15, endLine: 21 },
      { type: 'verse', label: 'Verse 2', startLine: 23, endLine: 30 },
      { type: 'chorus', label: 'Chorus', startLine: 32, endLine: 38 },
      { type: 'bridge', label: 'Bridge', startLine: 40, endLine: 45 },
      { type: 'outro', label: 'Outro', startLine: 47, endLine: 48 },
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'song-010',
    title: 'Living Hope',
    artist: 'Phil Wickham',
    key: 'G',
    bpm: 76,
    lyrics: '',
    chordChart: `{title: Living Hope}
{artist: Phil Wickham}
{key: G}
{tempo: 76}

{start_of_intro}
[Em] [C] [G] [D]
{end_of_intro}

{start_of_verse: Verse 1}
How great the [C]chasm that lay be-[G]tween us
How high the [D]mountain I could not [Em]climb
In desper-[C]ation, I turned to [G]heaven
And spoke Your [D]name into the [G]night
{end_of_verse}

{start_of_verse: Verse 2}
Then through the [C]darkness, Your loving-[G]kindness
Tore through the [D]shadows of my [Em]soul
The work is [C]finished, the end is [G]written
Jesus Christ, my living [D]hope
{end_of_verse}

{start_of_chorus}
Hallelujah, praise the [C]one who set me [G]free
Hallelujah, death has [D]lost its grip on [Em]me
You have [C]broken every chain
There's sal-[G]vation in Your [D]name
Jesus Christ, my living [G]hope
{end_of_chorus}

{start_of_verse: Verse 3}
Who could i-[C]magine so great a [G]mercy
What heart could [D]fathom such boundless [Em]grace
The God of [C]ages stepped down from [G]glory
To wear my [D]sin and bear my [G]shame
{end_of_verse}

{start_of_chorus}
Hallelujah, praise the [C]one who set me [G]free
Hallelujah, death has [D]lost its grip on [Em]me
You have [C]broken every chain
There's sal-[G]vation in Your [D]name
Jesus Christ, my living [G]hope
{end_of_chorus}

{start_of_bridge}
Then came the [C]morning that sealed the [G]promise
Your buried [D]body began to [Em]breathe
Out of the [C]silence, the Roaring [G]Lion
Declared the [D]grave has no claim on [G]me
Then came the [C]morning that sealed the [G]promise
Your buried [D]body began to [Em]breathe
Out of the [C]silence, the Roaring [G]Lion
Declared the [D]grave has no claim on [G]me
{end_of_bridge}

{start_of_chorus}
Hallelujah, praise the [C]one who set me [G]free
Hallelujah, death has [D]lost its grip on [Em]me
You have [C]broken every chain
There's sal-[G]vation in Your [D]name
Jesus Christ, my living [G]hope
{end_of_chorus}

{start_of_outro}
[Em] [C] [G] [D]
Jesus Christ, my living [G]hope
{end_of_outro}`,
    nashvilleChart: '',
    structure: [
      { type: 'intro', label: 'Intro', startLine: 5, endLine: 6 },
      { type: 'verse', label: 'Verse 1', startLine: 8, endLine: 12 },
      { type: 'verse', label: 'Verse 2', startLine: 14, endLine: 18 },
      { type: 'chorus', label: 'Chorus', startLine: 20, endLine: 26 },
      { type: 'verse', label: 'Verse 3', startLine: 28, endLine: 32 },
      { type: 'chorus', label: 'Chorus', startLine: 34, endLine: 40 },
      { type: 'bridge', label: 'Bridge', startLine: 42, endLine: 51 },
      { type: 'chorus', label: 'Final Chorus', startLine: 53, endLine: 59 },
      { type: 'outro', label: 'Outro', startLine: 61, endLine: 63 },
    ],
    createdAt: now,
    updatedAt: now,
  },
]
