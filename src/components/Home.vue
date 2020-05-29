<template>
  <div class="container">
    <div class="input-section">
      <i @click="toggleHideShow" id="hide-show" class="fas fa-eye"></i>
      <div v-if="show">
        <h2>Enter the number of juz that you want to simulate.</h2>
        <p id="note">Use comma (",") or dash ("-") for multiple juz number</p>
        <form>
          <input
            type="text"
            name="juzNumber"
            v-model="juzNumber"
            placeholder="ex: 1,2,30 or 28-30"
            required
          />
          <br />
          <button type="button" class="btn btn-dark btn-md" @click.stop.prevent="getJuzData">Start</button>
        </form>
      </div>
    </div>

    <div class="content" v-if="juz !== null">
      <div class="card">
        <div class="card-header">
          <strong>Juz {{ juz.number }}</strong>
        </div>
        <div class="card-body">
          <p class="card-text">{{ renderArText(juz.ayahs[currentAyah].text) }}</p>
        </div>
      </div>
      <div class="navigation">
        <div class="row">
          <div class="col">
            <button type="button" class="btn btn-dark btn-md" @click="getPrevAyah">Previous Ayah</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-dark btn-md" @click="getNextAyah">Next Ayah</button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button
              type="button"
              class="next-question btn btn-dark btn-md"
              @click="getNextQuestion"
            >Next Question</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="semipolar-spinner">
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
    </div>
  </div>
</template>

<script>
// import QuranService from '@/services/QuranService'
import JuzData from '@/../static/data/JuzData.json'

export default {
  name: 'home',
  data () {
    return {
      juzNumber: null,
      juz: null,
      currentAyah: 0,
      beginningOfJuz: false,
      endOfJuz: false,
      show: true,
      isLoading: false
    }
  },
  methods: {
    toggleHideShow () {
      if (this.show) {
        document.getElementById('hide-show').className = 'fas fa-eye-slash'
      } else document.getElementById('hide-show').className = 'fas fa-eye'
      this.show = !this.show
    },
    // async getJuzData () {
    //   this.juz = null
    //   this.isLoading = true
    //   await QuranService.getJuz({
    //     numberOfJuz: this.juzNumber
    //   })
    //     .then(response => {
    //       this.juz = response.data.data
    //       this.getNextQuestion()
    //       this.isLoading = false
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    getJuzData () {
      this.juz = null
      this.isLoading = true
      this.juz = JuzData.data[parseInt(this.juzNumber) - 1]
      this.isLoading = false
      this.getNextQuestion()
    },
    renderArText (text) {
      text = this.removeBasmala(text).split(' ')
      //   if (text.length > 12) {
      //     return text.slice(1, 12).join(' ')
      //   }
      return text.join(' ')
    },
    removeBasmala (text) {
      const ayah = this.juz.ayahs[this.currentAyah]
      //   if (ayah.surah.englishName !== 'Al-Faatiha') {
      //     return text.replace(
      //       '\u0628\u0650\u0633\u0652\u0645\u0650 \u0671\u0644\u0644\u0651\u064e\u0647\u0650 \u0671\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0671\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650',
      //       ''
      //     )
      //   }
      //   return text
      if (ayah.name !== 'Al-Faatiha') {
        return text.replace(JuzData.data[0].ayahs[0].text, '')
      }
      return text
    },
    getPrevAyah () {
      if (!this.beginningOfJuz) {
        this.currentAyah = this.currentAyah - 1
        if (this.currentAyah === 0) this.beginningOfJuz = true
        else this.beginningOfJuz = false
      }
    },
    getNextAyah () {
      if (!this.endOfJuz) {
        this.currentAyah = this.currentAyah + 1
        if (this.currentAyah === this.juz.ayahs.length - 1) {
          this.endOfJuz = true
        } else this.endOfJuz = false
      }
    },
    getNextQuestion () {
      this.currentAyah = Math.floor(Math.random() * this.juz.ayahs.length - 1)
      if (this.currentAyah === 0) this.beginningOfJuz = true
      else if (this.currentAyah === this.juz.ayahs.length - 1) {
        this.endOfJuz = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.card-header {
  font-size: 1.5rem;
}

.card-body {
  font-size: 2rem;
}

.card {
  border: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
}

.content {
  text-align: center;
}

.navigation {
  margin: 15px 0 15px 0;
}

.next-question {
  margin-top: 8px;
}

button {
  width: 100%;
}

.input-section {
  margin-bottom: 20px;
}

.semipolar-spinner,
.semipolar-spinner * {
  margin: auto;
  box-sizing: border-box;
}

.semipolar-spinner {
  height: 65px;
  width: 65px;
  position: relative;
}

.semipolar-spinner .ring {
  border-radius: 50%;
  position: absolute;
  border: calc(65px * 0.05) solid transparent;
  border-top-color: #343a40;
  border-left-color: #343a40;
  animation: semipolar-spinner-animation 2s infinite;
}

.semipolar-spinner .ring:nth-child(1) {
  height: calc(65px - 65px * 0.2 * 0);
  width: calc(65px - 65px * 0.2 * 0);
  top: calc(65px * 0.1 * 0);
  left: calc(65px * 0.1 * 0);
  animation-delay: calc(2000ms * 0.1 * 4);
  z-index: 5;
}

.semipolar-spinner .ring:nth-child(2) {
  height: calc(65px - 65px * 0.2 * 1);
  width: calc(65px - 65px * 0.2 * 1);
  top: calc(65px * 0.1 * 1);
  left: calc(65px * 0.1 * 1);
  animation-delay: calc(2000ms * 0.1 * 3);
  z-index: 4;
}

.semipolar-spinner .ring:nth-child(3) {
  height: calc(65px - 65px * 0.2 * 2);
  width: calc(65px - 65px * 0.2 * 2);
  top: calc(65px * 0.1 * 2);
  left: calc(65px * 0.1 * 2);
  animation-delay: calc(2000ms * 0.1 * 2);
  z-index: 3;
}

.semipolar-spinner .ring:nth-child(4) {
  height: calc(65px - 65px * 0.2 * 3);
  width: calc(65px - 65px * 0.2 * 3);
  top: calc(65px * 0.1 * 3);
  left: calc(65px * 0.1 * 3);
  animation-delay: calc(2000ms * 0.1 * 1);
  z-index: 2;
}

.semipolar-spinner .ring:nth-child(5) {
  height: calc(65px - 65px * 0.2 * 4);
  width: calc(65px - 65px * 0.2 * 4);
  top: calc(65px * 0.1 * 4);
  left: calc(65px * 0.1 * 4);
  animation-delay: calc(2000ms * 0.1 * 0);
  z-index: 1;
}

@keyframes semipolar-spinner-animation {
  50% {
    transform: rotate(360deg) scale(0.7);
  }
}

@media screen and (max-width: 426px) {
  h2 {
    font-size: 1.5rem;
  }

  #note {
    font-size: 0.75rem;
  }

  .card-header {
    font-size: 1rem;
  }

  .card-body {
    font-size: 1.5rem;
  }
}
</style>
