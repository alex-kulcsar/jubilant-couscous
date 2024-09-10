info.onLifeZero(function () {

})

//% weight=0 color=#BC8D15 icon="\uf185"
namespace solar {
    let initCredits = 0
    let ticks = 0
    let sunX = 0
    let sunY = 0
    let yesterdayScore = 0
    let runtimeStart = 0

    //% block
    export function setInitialCredits(num: number) {
        initCredits = num
    }

    //% block="move sun sprite $theSun"
    //% theSun.defl=sunSprite
    export function moveSun(theSun: Sprite) {
        ticks = (game.runtime() - runtimeStart) / 100
        sunX = 160 - 2 * ticks / 3
        sunY = 7 * (sunX * sunX) / 640 - 7 * sunX / 4 + 70
        theSun.setPosition(sunX, sunY)
    }

    //% block="attach shadow $shadow to player $player"
    //% shadow.defl=shadowSprite player.defl=mySprite
    export function attachShadowToPlayer(shadow: Sprite, player: Sprite) {
        if (shadow !== null && player !== null) {
            player.z = shadow.z + 1
        }
        game.onUpdate(function () {
            if (shadow !== null && player !== null) {
                shadow.x = player.right
                shadow.y = player.top
            }
        })
    }

    //% block="is sunlight made?"
    export function isSunlightMade() {
        let deltaX: number = Math.abs(sunX - 80)
        let chance: number = 90 * (80 - deltaX) / 80 + 10
        if (Math.percentChance(chance)) {
            return true
        } else {
            return false
        }
    }

    //% block
    //% theDay.defl=1
    export function setupDay(theDay: number) {
        if (theDay == 1) {
            info.setLife(initCredits)
        } else {
            info.changeLifeBy(Math.idiv(info.score() - yesterdayScore, 10))
        }
        yesterdayScore = info.score()
    }

    //% block
    export function startDay() {
        runtimeStart = game.runtime()
        info.startCountdown(24)
    }

    //% block="add cloud sprite $cloud"
    //% cloud.defl=cloudSprite
    export function addCloud(cloud: Sprite) {
        cloud.setPosition(200, 200)
        timer.background(function () {
            pause(randint(1000, 12000))
            cloud.left = 158
            cloud.y = randint(20, 50)
            cloud.vx = -100
            cloud.setFlag(SpriteFlag.AutoDestroy, true)
        })
    }

    /**
     * Image assets
     */
    export const smallShadow: Image = img`
        5 5 5 5 5 5 5 5
        5 . . . . . . 5
        5 . . . . . . 5
        5 5 5 5 5 5 5 5
    `
    export const smallPanel: Image = img`
        8 8 8 8 8 8 8 8
        8 9 8 8 8 9 8 8
        8 8 9 8 8 8 9 8
        8 8 8 8 8 8 8 8
    `
    export const largeShadow: Image = img`
        5 5 5 5 5 5 5 5 5 5 5 5
        5 . . . . . . . . . . 5
        5 . . . . . . . . . . 5
        5 . . . . . . . . . . 5
        5 . . . . . . . . . . 5
        5 5 5 5 5 5 5 5 5 5 5 5
    `
    export const largePanel: Image = img`
        8 8 8 8 8 8 8 8 8 8 8 8
        8 8 8 8 8 8 8 8 8 9 8 8
        8 8 9 8 8 8 8 8 9 9 9 8
        8 9 9 9 8 8 8 8 8 9 8 8
        8 8 9 8 8 8 8 8 8 8 8 8
        8 8 8 8 8 8 8 8 8 8 8 8
    `
    export const sun: Image = img`
        5 . . . . . . 5 . . . . . . 5 .
        . 5 . . 5 5 5 5 5 5 5 . . 5 . .
        . . 5 5 5 5 5 5 5 5 5 5 5 . . .
        . . 5 5 5 5 5 5 5 5 5 5 5 . . .
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 . .
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 . .
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 . .
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 .
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 . .
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 . .
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 . .
        . . 5 5 5 5 5 5 5 5 5 5 5 . . .
        . . 5 5 5 5 5 5 5 5 5 5 5 . . .
        . 5 . . 5 5 5 5 5 5 5 . . 5 . .
        5 . . . . . . 5 . . . . . . 5 .
        . . . . . . . . . . . . . . . .
    `
    export const sunlight: Image = img`
        5
        5
        5
        5
    `
    export const reducedSunlight: Image = img`
        4
        4
        4
        4
    `
    export const cloud: Image = img`
        . . c c c c c c c c c c c c . .
        . c 1 1 1 1 1 1 1 1 1 1 1 1 c .
        . . c 1 1 1 1 1 1 1 1 1 1 1 1 c
        . . c 1 1 1 1 1 1 1 1 1 1 1 1 c
        . c 1 1 1 1 1 1 1 1 1 1 1 1 1 c
        c 1 1 1 1 1 1 1 1 1 1 1 1 1 c .
        c 1 1 1 1 1 1 1 1 1 1 1 1 c . .
        . c c c c c c c c c c c c . . .
    `
    export const playerAvatar: Image = img`
        . . . . . . . f f f f f . . . .
        . . . . . . f e e e e e f . . .
        . . . . . f e e e d d d d f . .
        . . . . f f e e d f d d f d c .
        . . . f d d e e d f d d f d c .
        . . . c d b e e d d d d e e d c
        f f . c d b e e d d c d d d d c
        f e f . c f e e d d d c c c c c
        f e f . . f f e e d d d d d f .
        f e f . f e e e e f f f f f . .
        f e f f e e e e e e e f . . . .
        . f f e e e e f e f f e f . . .
        . . f e e e e f e f f e f . . .
        . . . f e f f b d f b d f . . .
        . . . f d b b d d c d d f . . .
        . . . f f f f f f f f f . . . .
    `
    export const lawn: Image = img`
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    `
}
