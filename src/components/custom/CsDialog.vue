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
              <v-col cols="4">
                {{ title }}
              </v-col>
              <v-col cols="4">
                <slot name="headerAction" />
              </v-col>
            </v-row>
            <v-btn
              absolute
              icon
              rounded
              style="top: 0px; right: 0px"
              class="ma-3 error--text text--lighten-2"
              @click="$emit('close-dialog')"
            >
              <v-icon size="xx-large">
                mdi-close
              </v-icon>
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
  
          <v-card-actions>
            <v-spacer />
            <v-btn
              v-if="resetButton"
              :color="resetButtonColor"
              class="ma-0 pa-2 ml-4"
              text
              :loading="loadingResetButton"
              @click="$emit('reset-dialog')"
            >
              {{ resetButtonLabel }}
            </v-btn>
            <v-btn
              v-if="saveButton"
              :color="saveButtonColor"
              class="ma-0 pa-2"
              :loading="loadingSaveButton"
              :disabled="disabled"
              @click="saveDialog"
            >
              {{ saveButtonLabel }}
            </v-btn>
            <v-btn
              v-if="cancelButton"
              :color="cancelButtonColor"
              class="ma-0 pa-2 ml-4"
              text
              :loading="loadingCancelButton"
              @click="$emit('cancel-dialog')"
            >
              {{ cancelButtonLabel }}
            </v-btn>
          </v-card-actions>
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
      saveButton: {
        type: Boolean,
        required: false
      },
      saveButtonLabel: {
        type: String,
        default: 'Save'
      },
      saveButtonColor: {
        type: String,
        default: 'primary'
      },
      cancelButton: {
        type: Boolean,
        required: false
      },
      cancelButtonLabel: {
        type: String,
        default: 'Cancel'
      },
      cancelButtonColor: {
        type: String,
        default: 'info1'
      },
      resetButton: {
        type: Boolean,
        required: false
      },

      resetButtonLabel: {
        type: String,
        default: 'Reset'
      },
      resetButtonColor: {
        type: String,
        default: 'info2'
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
      loadingSaveButton: {
        type: Boolean,
        default: false
      },
      loadingCancelButton: {
        type: Boolean,
        default: false
      },
      loadingResetButton: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      saveDialog () {
        this.$emit('save-dialog')
      }
    }
  }
  </script>
  