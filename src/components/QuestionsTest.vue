<template>
  <v-app>
    <v-container>
      <v-card v-if="!testStarted">
        <v-card-title>Spustenie testu</v-card-title>
        <v-card-text>
          <v-text-field v-model.number="questionLimit" label="Počet otázok" type="number" min="1" max="100" />
          <v-btn @click="startTest" color="primary">Spustiť test</v-btn>
        </v-card-text>
      </v-card>

      <v-card v-else-if="!showResults">
        <v-card-title>
          Otázka {{ currentIndex + 1 }} z {{ questions.length }}
        </v-card-title>
        <v-card-text>
          <div>{{ currentQuestion.question }}</div>
          <div>
            <v-checkbox
              v-for="(ans, index) in labeledAnswers(currentQuestion.answers)"
              :key="index"
              v-model="userAnswers[currentIndex]"
              :label="`${ans.label}) ${ans.text}`"
              :value="ans.index"
              hide-details
            />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="nextQuestion" color="primary">Ďalej</v-btn>
        </v-card-actions>
      </v-card>

      <v-card v-else>
        <v-card-title>Výsledky</v-card-title>
        <v-card-text>
          <div>
            <div>
            Správne: {{ score }} / {{ maxScore }}
            </div>
          </div>
          <div v-for="(q, i) in questions" :key="i" class="my-4">
            <strong>{{ i + 1 }}. {{ q.question }}</strong>
            <v-list dense>
              <v-list-item
                v-for="(ans, j) in labeledAnswers(q.answers)"
                :key="j"
                :class="{
                  'green--text': ans.correct,
                  'red--text': userAnswers[i]?.includes(ans.index) && !ans.correct,
                }"
              >
                <v-icon small v-if="userAnswers[i]?.includes(ans.index)" class="mr-2">mdi-check-circle</v-icon>
                <v-icon small v-else class="mr-2" color="transparent">mdi-checkbox-blank-circle-outline</v-icon>
                {{ ans.label }}) {{ ans.text }}
              </v-list-item>
            </v-list>
          </div>
          <v-btn @click="resetTest" color="primary" class="mt-4">Spustiť nový test</v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import questions from '../../derma-test-rework.json';

export default {
  data() {
    return {
      originalQuestions: questions,
      questions: [],
      currentIndex: 0,
      userAnswers: [],
      showResults: false,
      testStarted: false,
      questionLimit: 20,
    };
  },
  computed: {
    maxScore() {
        return this.questions.reduce((total, q) => {
            return total + q.answers.filter(a => a.correct).length;
        }, 0);
    },
    currentQuestion() {
      return this.questions[this.currentIndex];
    },
   score() {
        return this.questions.reduce((total, q, i) => {
            const userAns = this.userAnswers[i] || [];
            return total + userAns.reduce((sum, idx) => q.answers[idx]?.correct ? sum + 1 : sum, 0);
        }, 0);
},
  },
  methods: {
    startTest() {
      const shuffled = this.shuffle([...this.originalQuestions]);
      this.questions = shuffled.slice(0, this.questionLimit);
      this.userAnswers = Array(this.questionLimit).fill([]);
      this.currentIndex = 0;
      this.testStarted = true;
      this.showResults = false;
    },
    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
      } else {
        this.showResults = true;
      }
    },
    resetTest() {
      this.testStarted = false;
      this.showResults = false;
      this.questions = [];
      this.userAnswers = [];
      this.currentIndex = 0;
    },
    shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },
    labeledAnswers(answers) {
      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
      return answers.map((ans, idx) => ({
        ...ans,
        label: letters[idx],
        index: idx
      }));
    }
  }
};
</script>

<style>
.red--text { color: red; }
.green--text { color: green; }
</style>
