<template >

  <div class="beijing" :style="{backgroundImage: 'url(' + img + ')'}">

    <div class="content">
      <div class="title">
        <img src="../assets/img/welcome/title.png">
      </div>
      <div class="sub-title">
        <img src="../assets/img/welcome/decoration1.png">
        <p class="txt">南审校园二手交易平台</p>
        <img src="../assets/img/welcome/decoration2.png">
      </div>
      <div class="button">
        <div class="button1 pointer" @click="goHome">
          <main>
            <a href="#" class="tilter tilter--1">
              <figure class="tilter__figure">
                <img class="tilter__image" :src="img1" alt="img01" />
                <div class="tilter__deco tilter__deco--shine">
                  <div></div>
                </div>
                <figcaption class="tilter__caption">
                  <img :src="img3" alt="img02" />
                </figcaption>
                <svg class="tilter__deco tilter__deco--lines" viewBox="0 0 300 415">
                  <path d="M20.5,20.5h260v375h-260V20.5z" />
                </svg>
              </figure>
            </a>
          </main>
          <!-- <img src="../assets/img/welcome/1.jpg" /> -->
        </div>
        <div class="button2 pointer" @click="goseek">
          <main>
            <a href="#" class="tilter tilter--1">
              <figure class="tilter__figure">
                <img class="tilter__image" :src="img2" alt="img02" />
                <div class="tilter__deco tilter__deco--shine">
                </div>
                <figcaption class="tilter__caption">
                  <img :src="img4" alt="img02" />
                </figcaption>
                <svg class="tilter__deco tilter__deco--lines" viewBox="0 0 300 415">
                  <path d="M20.5,20.5h260v375h-260V20.5z" />
                </svg>
              </figure>
            </a>
          </main>
          <!-- <img src="../assets/img/welcome/2.jpg" /> -->
        </div>
      </div>
      <div class="admin pointer" @click="admin">管理员登陆</div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      img: require('@/assets/img/welcome/beijing.jpg'),
      img1: require('@/assets/img/welcome/1.jpg'),
      img2: require('@/assets/img/welcome/2.jpg'),
      img3: require('@/assets/img/welcome/111.png'),
      img4: require('@/assets/img/welcome/222.png')
    }
  },
  methods: {
    goHome() {
      this.$router.push('/home')
    },
    goseek() {
      this.$router.push('/home/seekGoods')
    },
    admin() {
      var str = prompt()
      if (str == '123456') {
        this.$router.push('/home/admin')
      } else {
        alert('登陆失败！')
      }
    },
    move() {}
  },
  mounted() {
    let reg2 = /(^| )+userId=+([^;]+.*?)/
    let id = document.cookie.match(reg2)
    if (id) this.$store.state.userId = id[2]
    ;(function() {
      var tiltSettings = [
        {},
        {
          movement: {
            imgWrapper: {
              translation: {
                x: 10,
                y: 10,
                z: 30
              },
              rotation: {
                x: 0,
                y: -10,
                z: 0
              },
              reverseAnimation: {
                duration: 200,
                easing: 'easeOutQuad'
              }
            },
            lines: {
              translation: {
                x: 10,
                y: 10,
                z: [0, 70]
              },
              rotation: {
                x: 0,
                y: 0,
                z: -2
              },
              reverseAnimation: {
                duration: 2000,
                easing: 'easeOutExpo'
              }
            },
            caption: {
              rotation: {
                x: 0,
                y: 0,
                z: 2
              },
              reverseAnimation: {
                duration: 200,
                easing: 'easeOutQuad'
              }
            },
            overlay: {
              translation: {
                x: 10,
                y: -10,
                z: 0
              },
              rotation: {
                x: 0,
                y: 0,
                z: 2
              },
              reverseAnimation: {
                duration: 2000,
                easing: 'easeOutExpo'
              }
            },
            shine: {
              translation: {
                x: 100,
                y: 100,
                z: 0
              },
              reverseAnimation: {
                duration: 200,
                easing: 'easeOutQuad'
              }
            }
          }
        },
        {
          movement: {
            imgWrapper: {
              rotation: {
                x: -5,
                y: 10,
                z: 0
              },
              reverseAnimation: {
                duration: 900,
                easing: 'easeOutCubic'
              }
            },
            caption: {
              translation: {
                x: 30,
                y: 30,
                z: [0, 40]
              },
              rotation: {
                x: [0, 15],
                y: 0,
                z: 0
              },
              reverseAnimation: {
                duration: 1200,
                easing: 'easeOutExpo'
              }
            },
            overlay: {
              translation: {
                x: 10,
                y: 10,
                z: [0, 20]
              },
              reverseAnimation: {
                duration: 1000,
                easing: 'easeOutExpo'
              }
            },
            shine: {
              translation: {
                x: 100,
                y: 100,
                z: 0
              },
              reverseAnimation: {
                duration: 900,
                easing: 'easeOutCubic'
              }
            }
          }
        },
        {
          movement: {
            imgWrapper: {
              rotation: {
                x: -5,
                y: 10,
                z: 0
              },
              reverseAnimation: {
                duration: 50,
                easing: 'easeOutQuad'
              }
            },
            caption: {
              translation: {
                x: 20,
                y: 20,
                z: 0
              },
              reverseAnimation: {
                duration: 200,
                easing: 'easeOutQuad'
              }
            },
            overlay: {
              translation: {
                x: 5,
                y: -5,
                z: 0
              },
              rotation: {
                x: 0,
                y: 0,
                z: 6
              },
              reverseAnimation: {
                duration: 1000,
                easing: 'easeOutQuad'
              }
            },
            shine: {
              translation: {
                x: 50,
                y: 50,
                z: 0
              },
              reverseAnimation: {
                duration: 50,
                easing: 'easeOutQuad'
              }
            }
          }
        },
        {
          movement: {
            imgWrapper: {
              translation: {
                x: 0,
                y: -8,
                z: 0
              },
              rotation: {
                x: 3,
                y: 3,
                z: 0
              },
              reverseAnimation: {
                duration: 1200,
                easing: 'easeOutExpo'
              }
            },
            lines: {
              translation: {
                x: 15,
                y: 15,
                z: [0, 15]
              },
              reverseAnimation: {
                duration: 1200,
                easing: 'easeOutExpo'
              }
            },
            overlay: {
              translation: {
                x: 0,
                y: 8,
                z: 0
              },
              reverseAnimation: {
                duration: 600,
                easing: 'easeOutExpo'
              }
            },
            caption: {
              translation: {
                x: 10,
                y: -15,
                z: 0
              },
              reverseAnimation: {
                duration: 900,
                easing: 'easeOutExpo'
              }
            },
            shine: {
              translation: {
                x: 50,
                y: 50,
                z: 0
              },
              reverseAnimation: {
                duration: 1200,
                easing: 'easeOutExpo'
              }
            }
          }
        },
        {
          movement: {
            lines: {
              translation: {
                x: -5,
                y: 5,
                z: 0
              },
              reverseAnimation: {
                duration: 1000,
                easing: 'easeOutExpo'
              }
            },
            caption: {
              translation: {
                x: 15,
                y: 15,
                z: 0
              },
              rotation: {
                x: 0,
                y: 0,
                z: 3
              },
              reverseAnimation: {
                duration: 1500,
                easing: 'easeOutElastic',
                elasticity: 700
              }
            },
            overlay: {
              translation: {
                x: 15,
                y: -15,
                z: 0
              },
              reverseAnimation: {
                duration: 500,
                easing: 'easeOutExpo'
              }
            },
            shine: {
              translation: {
                x: 50,
                y: 50,
                z: 0
              },
              reverseAnimation: {
                duration: 500,
                easing: 'easeOutExpo'
              }
            }
          }
        },
        {
          movement: {
            imgWrapper: {
              translation: {
                x: 5,
                y: 5,
                z: 0
              },
              reverseAnimation: {
                duration: 800,
                easing: 'easeOutQuart'
              }
            },
            caption: {
              translation: {
                x: 10,
                y: 10,
                z: [0, 50]
              },
              reverseAnimation: {
                duration: 1000,
                easing: 'easeOutQuart'
              }
            },
            shine: {
              translation: {
                x: 50,
                y: 50,
                z: 0
              },
              reverseAnimation: {
                duration: 800,
                easing: 'easeOutQuart'
              }
            }
          }
        },
        {
          movement: {
            lines: {
              translation: {
                x: 40,
                y: 40,
                z: 0
              },
              reverseAnimation: {
                duration: 1500,
                easing: 'easeOutElastic'
              }
            },
            caption: {
              translation: {
                x: 20,
                y: 20,
                z: 0
              },
              rotation: {
                x: 0,
                y: 0,
                z: -5
              },
              reverseAnimation: {
                duration: 1000,
                easing: 'easeOutExpo'
              }
            },
            overlay: {
              translation: {
                x: -30,
                y: -30,
                z: 0
              },
              rotation: {
                x: 0,
                y: 0,
                z: 3
              },
              reverseAnimation: {
                duration: 750,
                easing: 'easeOutExpo'
              }
            },
            shine: {
              translation: {
                x: 100,
                y: 100,
                z: 0
              },
              reverseAnimation: {
                duration: 750,
                easing: 'easeOutExpo'
              }
            }
          }
        }
      ]
      function init() {
        var idx = 0
        ;[].slice
          .call(document.querySelectorAll('a.tilter'))
          .forEach(function(el, pos) {
            idx = pos % 2 === 0 ? idx + 1 : idx
            new TiltFx(el, tiltSettings[idx - 1])
          })
      }
      // Preload all images.
      imagesLoaded(document.querySelector('main'), function() {
        document.body.classList.remove('loading')
        init()
      })
    })()
  }
}
</script>

<style scoped>
.beijing {
  width: 100%;
  height: 1080px;
  overflow: hidden;
  background-size: 100% 100%;
  position: relative;
}

.content {
  width: 1080px;
  height: auto;
  margin: 0 auto;
}

.title {
  width: 1080px;
  height: 180px;
  text-align: center;
  margin-top: 110px;
}

.sub-title {
  width: 1080px;
  height: 80px;
  text-align: center;
}

.sub-title * {
  display: inline-block;
}

.txt {
  font: 30px '微软雅黑';
  color: #fff;
  margin-left: 50px;
  margin-right: 50px;
  letter-spacing: 0.5em;
}

.button {
  width: 1080px;
  height: auto;
  position: relative;
}

.button1 {
  width: 324px;
  height: 404px;
  margin-top: 100px;
  margin-left: 149px;
  display: inline-block;
}
.button2 {
  width: 324px;
  height: 404px;
  margin-left: 136px;
  display: inline-block;
}
.admin {
  width: 130px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  color: #fff;
  line-height: 30px;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
