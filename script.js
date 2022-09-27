const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
const cdMaxWidth = $('.cd').clientWidth
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')
const playlistMargin = Number(getComputedStyle(playlist).marginTop.replace('px',''))
const playlistHeight = $('.playlist').offsetHeight
const progressBarWidth = $('.progress-wrap').clientWidth
const cdThumbHeight = cdThumb.clientHeight
const cdThumbAnimate = cdThumb.animate([
    { transform: 'rotate(360deg)' }
], {
    duration: 10000,
    iterations: Infinity
})

cdThumbAnimate.pause()
var isPlaying = false;
var isRandom = false;
var isRepeat = false;
var checkScrollUp = 0;
var checkScrollDown = 0;
const app = {
    currentIndex: 0,
    songs: [
        {
            name: 'Phố không em',
            author: 'Thái Đinh',
            path: './assets/music/phokhongem.mp3',
            image: 'https://i.ytimg.com/vi/i_hdxA_SSyo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAmzpF2hkLdXYK19cOR3tl9aksIXw'
        },
        {
            name: 'Đường tôi chở em về',
            author: 'Bùi Trường Linh',
            path: './assets/music/duongtoichoemve.mp3',
            image: 'https://i.ytimg.com/vi/OuNo8Tkb3lI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAWPpcVkvaDfCWOdv9_IbtBN3gkoA'
        },
        {
            name: 'Gió vẫn hát',
            author: 'Long Phạm',
            path: './assets/music/giovanhat.mp3',
            image: 'https://i.ytimg.com/vi/1d2HfH8EBsk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCB2UlIHJNDp4vLtWnz65XMNrqP8Q'
        },
        {
            name: 'Thằng điên',
            author: 'Justatee',
            path: './assets/music/thangdien.mp3',
            image: 'https://i.ytimg.com/vi/HXkh7EOqcQ4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAwH8oLZs6Ba5Qv4Knkjsxr8Th4zA'
        },
        {
            name: 'Phi điểu và ve sầu',
            author: 'Nhậm Nhiên',
            path: 'https://api.mp3.zing.vn/api/streaming/song/ZWDO9OUF/320',
            image: 'https://i.ytimg.com/vi/BoWPSgz4Hx8/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBW8kfTVfZoUBANj6tarJGKRyjK1w'
        },
        {
            name: 'Người theo đuổi ánh sáng',
            author: 'Từ Vi',
            path: 'https://api.mp3.zing.vn/api/streaming/song/ZW9D6CI0/320',
            image: 'https://i.ytimg.com/vi/O_T1boJt4pU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDU1zb0sXJMBW8FgwAdmXYzfPlOjw'
        },
        {
            name: 'Ánh nắng của anh',
            author: 'Đức Phúc',
            path: 'https://api.mp3.zing.vn/api/streaming/song/ZW78BW9D/320',
            image: 'https://i.ytimg.com/vi/1P4DaXgzVnE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC9BcRhdQtMV0pjUkQcv1hfzNy_vw'
        },
        {
            name: 'Ừ có anh đây',
            author: 'Tino',
            path: 'https://api.mp3.zing.vn/api/streaming/song/ZW8WZ7B9/320',
            image: 'https://i.ytimg.com/vi/qar25VLWgdU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBzFYozmVEK9T04PV_AS-pMzxtXFA'
        },
        {
            name: 'Mùa mưa ngâu nằm cạnh',
            author: 'Vũ.',
            path: 'https://api.mp3.zing.vn/api/streaming/song/ZWAB0DF6/320',
            image: 'https://i.ytimg.com/vi/8TszjrFJOe0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCqWMzvGl3Cbda6M9El-pfeDLv5cQ'
        },
        {
            name: 'Cũng đành thôi',
            author: 'Đức Phúc',
            path: 'https://api.mp3.zing.vn/api/streaming/song/ZW78UBIB/320',
            image: 'https://i.ytimg.com/vi/Qs-XcmaxaLw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDY4uhNK3on1fSUHHHWuPqYPqtoGA'
        },
        {
            name: 'Sai người sai thời điểm',
            author: 'Thanh Hưng',
            path: 'https://api.mp3.zing.vn/api/streaming/song/ZW9A7CEE/320',
            image: 'https://i.ytimg.com/vi/ICOcEzXsEOI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAyxJqgaOW_hNKPaPJk5bbrv8zKgg'
        }
    ],

    render() {
        const htmls = this.songs.map((e, i) =>
            `<div data-index="${i}" class="song ${i === this.currentIndex ? 'active' : ''}">
                <div class="thumb"
                    style="background-image: url('${e.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${e.name}</h3>
                    <p class="author">${e.author}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`)
        $('.playlist').innerHTML = htmls.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents() {
        document.onscroll = function () {
            var scale = 1 - window.scrollY / 210;
            $('.cd').style.width = `calc(${cdMaxWidth}px * ${scale})`
            $('.cd').style.opacity = `${scale}`
            var j = window.scrollY;
            // console.log(window.scrollY, checkScrollUp )
            if (window.scrollY > checkScrollUp && $('.playlist').offsetHeight < 670) {
                $('.playlist').style.setProperty('height', `${playlistHeight + j}px`)
                checkScrollUp = window.scrollY
                // playlist.style.setProperty('margin-top',`${playlistMargin-cdMaxWidth+cdThumb.offsetHeight}px`)
            }
            if (window.scrollY <= checkScrollDown && $('.playlist').offsetHeight > playlistHeight) {
                if($('.playlist').offsetHeight - checkScrollDown + j>=464)
                    $('.playlist').style.setProperty('height', `${$('.playlist').offsetHeight - checkScrollDown + j}px`)
                else $('.playlist').style.setProperty('height','464px')
                checkScrollUp = window.scrollY
            }
            checkScrollDown = window.scrollY

        }

        $('.btn-toggle-play').onclick = function () {
            if (isPlaying) {
                $('.player').classList.remove('playing')
                audio.pause()
                isPlaying = false;
                cdThumbAnimate.pause()
            }
            else {
                $('.player').classList.add('playing')
                audio.play()
                isPlaying = true
                cdThumbAnimate.play()
            }
        }

        audio.onended = function () {
            if (isRepeat) {
                audio.play()
            } else {
                $('.btn-next').click()
            }
        }

        setInterval(function () {
            var percent = Math.floor(100 * audio.currentTime / audio.duration)
            $('.progress-bar').style.setProperty('width',`${progressBarWidth*percent/100}px`)
            $('.progress').value = percent || 0
        }, 1000)


        $('.progress').onchange = function (e) {
            audio.currentTime = e.target.value * audio.duration / 100
            var percent = Math.floor(100 * audio.currentTime / audio.duration)
            $('.progress-bar').style.setProperty('width',`${progressBarWidth*percent/100+8}px`)
        }

        $('.btn-next').onclick = function () {
            if (isRandom) app.playRandom()
            else app.nextSong()
            audio.play()
            $('.player').classList.add('playing')
        }

        $('.btn-prev').onclick = function () {
            if (isRandom) app.playRandom()
            else app.prevSong()
            audio.play()
            $('.player').classList.add('playing')
        }

        randomBtn.onclick = function () {
            isRandom = !isRandom
            this.classList.toggle('active')
            if (isRepeat) {
                isRepeat = !isRepeat
                repeatBtn.classList.remove('active')
            }
        }

        repeatBtn.onclick = function () {
            isRepeat = !isRepeat
            if (isRandom) {
                isRandom = !isRandom
                randomBtn.classList.remove('active')
            }
            this.classList.toggle('active')
        }

        // $('.player').click()
        playlist.onclick = function (e) {
            if (e.target.closest('.song:not(.active)') && !e.target.closest('.option')) {
                app.currentIndex = Number(e.target.closest('.song:not(.active)').getAttribute('data-index'))
                app.loadCurrentSong()
                audio.play()
                app.activeSong()
                if ($('.player.playing') === null) $('.btn-toggle-play').click()
            }
        }


    },

    prevSong() {
        if (app.currentIndex > 0) app.currentIndex--;
        else app.currentIndex = app.songs.length - 1;
        cdThumbAnimate.currentTime = 0;
        cdThumbAnimate.play()
        app.loadCurrentSong()
        this.activeSong()
    },

    nextSong() {
        if (app.currentIndex === (app.songs.length - 1)) app.currentIndex = 0;
        else app.currentIndex++;
        cdThumbAnimate.currentTime = 0;
        cdThumbAnimate.play()
        app.loadCurrentSong()
        this.activeSong()
    },

    loadCurrentSong() {
        const heading = $('header h2')
        const cdThumb = $('.cd-thumb')
        const audio = $('#audio')
        heading.innerText = `${this.currentSong.name}`
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = `${this.currentSong.path}`
        // this.activeSong()
    },

    playRandom() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
        this.activeSong()
    },

    activeSong() {
        $('.song.active').classList.remove('active')
        $$('.song')[this.currentIndex].classList.add('active')

        if (this.currentIndex >= 3 && this.currentIndex < this.songs.length - 2) $('.playlist').scrollTop = 73.6 * (this.currentIndex - 2)
        else if (this.currentIndex == 0) {
            $('.song.active').scrollIntoView(
                {
                    behavior: "smooth", block: "start", inline: "nearest"
                })
            setTimeout(function() {
                window.scrollTo(0,0)
            },600)

        } else if (this.currentIndex == this.songs.length - 1) {
            $('.song.active').scrollIntoView(
                {
                    behavior: "smooth", block: "end", inline: "nearest"
                })
        }
    },


    start() {
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentSong()
        this.render()
    }
}

app.start();