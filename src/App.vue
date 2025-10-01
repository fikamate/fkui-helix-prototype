<script setup lang="ts">
import { ref } from 'vue';
import {
    FPageLayout,
    FResizePane,
    registerLayout,
    FPageHeader,
    FLogo,
} from "@fkui/vue";
import {
    XContextBar,
    XToolbar,
    XLeftPanel,
    XPersonPanel,
    XExpensePanel,
} from "./components";
import HxTextField from "./components/hx-textfield/HxTextField.vue";

declare module "@fkui/vue" {
    interface FPageLayoutSlotMapping {
        "awesome-layout": [
            "header",
            "left",
            "contextbar",
            "toolbar",
            "content",
            "right",
            "footer"
        ];
    }
}

registerLayout({
    name: "awesome-layout",
    areas: {
        header: {
            attachPanel: "none",
            direction: "column",
        },
        left: {
            attachPanel: "left",
            direction: "column",
        },
        contextbar: {
            attachPanel: "none",
            direction: "row",
        },
        toolbar: {
            attachPanel: "none",
            direction: "row",
        },
        content: {
            attachPanel: "none",
            direction: "column",
            scroll: true,
        },
        right: {
            attachPanel: "right",
            direction: "column",
        },
        footer: {
            attachPanel: "none",
            direction: "column",
        },
    },
});

// Reactive data för HxTextField
const testValue = ref('');
const name = ref('')
const email = ref('')
const phone = ref('')
</script>

<template>
    <f-page-layout layout="awesome-layout">
        <template
            #default="{ header, contextbar, toolbar, content, left, right }"
        >
            <header :slot="header">
                <f-page-header>
                    Application layout components
                    <template #logo>
                        <f-logo size="small">Logo</f-logo>
                    </template>
                    <template #right> Namn Namnsson </template>
                </f-page-header>
            </header>

            <x-context-bar :slot="contextbar"></x-context-bar>

            <x-toolbar :slot="toolbar"></x-toolbar>

            <f-resize-pane
                :slot="left"
                min="200px 10%"
                max="40%"
                initial="600px"
            >
                <x-left-panel></x-left-panel>
            </f-resize-pane>

<main :slot="content">
    <div class="container">
        <div class="density-default">
            <small>(Densitetsgrad: default-density)</small>
            <HxTextField
                v-model="name"
                description="Hjälptext"
                format-description="Formatbeskrivning"
                placeholder="Namn"
            >
                <template #default>Etikettnamn</template>
            </HxTextField>
        </div>

        <div class="density-dense">
            <small>(Densitetsgrad: dense-density)</small>
            <HxTextField
                v-model="email"
                description="Hjälptext"
                format-description="Formatbeskrivning"
                placeholder="E-post"
            >
                <template #default>Etikettnamn</template>
            </HxTextField>
        </div>

        <div class="density-densest">
            <small>(Densitetsgrad: densest-density)</small>
            <HxTextField
                v-model="phone"
                description="Hjälptext"
                format-description="Formatbeskrivning"
                placeholder="Telefon"
            >
                <template #default>Etikettnamn</template>
            </HxTextField>
        </div>

        <div>
            <p>Namn: {{ name }}</p>
            <p>E-post: {{ email }}</p>
            <p>Telefon: {{ phone }}</p>
        </div>
    </div>
</main>
<router-view />

            <f-resize-pane
                :slot="right"
                min="200px 10%"
                max="40%"
                initial="200px"
            >
                <x-person-panel name="person-panel" exclusive="right">
                </x-person-panel>
                <x-expense-panel
                    name="expense-panel"
                    exclusive="right"
                ></x-expense-panel>
            </f-resize-pane>
        </template>
    </f-page-layout>
</template>

<!-- ALL STYLING MOVED TO SCSS -->
<!-- src/styles/components/page-layout/page-layout.scss -->
