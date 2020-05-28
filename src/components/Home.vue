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
      show: true
    }
  },
  methods: {
    toggleHideShow () {
      if (this.show) {
        document.getElementById('hide-show').className = 'fas fa-eye-slash'
      } else document.getElementById('hide-show').className = 'fas fa-eye'
      this.show = !this.show
    },
    getJuzData () {
      this.juz = null
      this.juz = JuzData.data[parseInt(this.juzNumber) - 1]
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
      if ((ayah.number === 1) & (ayah.name !== 'Al-Faatiha')) {
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
