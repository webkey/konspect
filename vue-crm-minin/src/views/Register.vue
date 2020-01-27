<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>

      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">Имя</label>
        <small
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
        >Введите Имя
        </small>
      </div>

      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
        >Поле Email не должно быть пустым
        </small>
        <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
        >Введите корректный Email
        </small>
      </div>

      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
        >Введите Пароль
        </small>
        <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.minLength"
        >Введено: {{password.length}}. Осталось: {{$v.password.$params.minLength.min - password.length}}
        </small>
      </div>

      <div class="input-field">
        <input
            id="passwordRepeat"
            type="password"
            v-model="passwordRepeat"
            :class="{invalid: ($v.passwordRepeat.$dirty && !$v.passwordRepeat.required) || ($v.passwordRepeat.$dirty && !$v.passwordRepeat.repeat)}"
        >
        <label for="passwordRepeat">Повторите Пароль</label>
        <small
            class="helper-text invalid"
            v-if="$v.passwordRepeat.$dirty && !$v.passwordRepeat.required"
        >Продублируйте Пароль
        </small>
        <small
            class="helper-text invalid"
            v-else-if="$v.passwordRepeat.$dirty && !$v.passwordRepeat.repeat"
        >Пароли не совпадают}}
        </small>
      </div>

      <p>
        <label>
          <input
              type="checkbox"
              v-model="agree"
              :class="{invalid: !$v.agree.repeat}"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт? <router-link to="/r">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import {required, email, minLength} from 'vuelidate/lib/validators'

  export default {
    name: 'Register',
    data: () => ({
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
      agree: false
    }),
    validations: {
      name: {required},
      email: {required, email},
      password: {required, minLength: minLength(6)},
      passwordRepeat: {
        required,
        repeat: (c, vue) => c === vue.password
      },
      agree: {agree: c => c}
    },
    methods: {
      // Оператор async указваем потому что внутри метода submitHandler выполняется асинхронный метод (промис) store register с оператором await
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();

          return;
        }

        const formData = {
          email: this.email,
          password: this.password,
          name: this.name
        };

        try {
          // Оператор await означает, что необходимо подождать выполнения асинхронного метода register
          await this.$store.dispatch('register', formData);
          this.$router.push('/')
        } catch (e) {
          return false;
        }
      }
    }
  }
</script>