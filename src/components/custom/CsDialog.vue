<template>
    <v-dialog
      v-bind="$attrs"
      persistent
      :max-width="maxWidth"
    >
      <v-card
        :min-width="minWidth"
      >
        <v-card>
          <v-card-title class="text-h5 pr-12">
            <v-row>
                {{ title }}
            </v-row>
            <v-btn
              absolute
              icon
              rounded
              style="top: 0px; right: 0px"
              class="ma-3 error--text text--lighten-2"
              @click="$emit('close-dialog')"
            >
              <!-- <v-icon size="xx-large">
                mdi-close
              </v-icon> -->
              X
            </v-btn>
          </v-card-title>
          <v-card-title
            v-if="subtitle"
          >
            <v-container
              fluid
              class="ma-0 pa-0 mb-5"
            >
              <v-row class="ma-0 pa-0 white--text secondary lighten-1">
                <v-col
                  cols="12"
                >
                  {{ subtitle }}
                </v-col>
              </v-row>
            </v-container>
          </v-card-title>
          <slot />
        </v-card>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: 'CsDialog',
    props: {
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        required: false,
        default: ''
      },
      maxWidth: {
        type: String,
        required: false,
        default: '500'
      },
      minWidth: {
        type: String,
        required: false,
        default: ''
      },
    },
    methods: {
    }
  }
  </script>
  