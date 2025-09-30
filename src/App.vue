<script setup lang="ts">
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
                <router-view />
            </main>

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

<style scoped>
::part(grid awesome-layout) {
    grid-template:
        "header header header" min-content
        "left contextbar contextbar" min-content
        "left toolbar toolbar" min-content
        "left content right" 1fr
        / min-content 1fr;
}

/* ========================================
   LAYOUT AREAS STYLING (Manuellt - FKUI har inga variabler för dessa)
   ======================================== */

::part(area header) {
    /* Layout areas måste stylas manuellt eftersom FKUI inte har 
       CSS-variabler för ::part(area xxx) selektor */
    background: var(--my-primary-color) !important;
    color: white !important;

    /* Dessa FKUI-variabler kommer från generated-fkui-overrides.scss
       men fungerar kanske inte för layout areas */
    --f-background-pageheader-primary: var(--my-primary-color) !important;
    --f-page-layout-color: white !important;
}

::part(area contextbar) {
    /* FKUI layout-variabler */
    --f-page-layout-background: var(--my-surface) !important;
    --f-page-layout-color: var(--my-text-primary) !important;

    /* Manuella overrides */
    background: var(--my-surface) !important;
    border-bottom: 2px solid var(--my-secondary-color) !important;
}

::part(area toolbar) {
    --f-page-layout-background: var(--my-surface) !important;
    --f-page-layout-color: var(--my-text-primary) !important;
    background: var(--my-surface) !important;
    border-bottom: 3px solid var(--my-primary-color) !important;
}

::part(area left) {
    --f-page-layout-background: var(--my-surface) !important;
    --f-page-layout-color: var(--my-text-primary) !important;
    background: var(--my-surface) !important;
    border-right: 2px solid var(--my-accent-color) !important;
}

::part(area right) {
    --f-page-layout-background: var(--my-surface) !important;
    --f-page-layout-color: var(--my-text-primary) !important;
    background: var(--my-surface) !important;
    border-left: 2px solid var(--my-accent-color) !important;
}

/* Styling med vårt nya variabelsystem */
f-page-header,
f-page-header *,
:deep(f-page-header),
:deep(.f-page-header) {
    background: var(--my-primary-color) !important;
    background-color: var(--my-primary-color) !important;
    background-image: linear-gradient(
        135deg,
        var(--my-primary-color),
        var(--my-secondary-color)
    ) !important;
    color: white !important;
    box-shadow: var(--my-shadow) !important;
    padding: var(--my-spacing-md) !important;
}

/* ========================================
   FKUI KOMPONENTER (Automatiskt från generated-fkui-overrides.scss)
   ======================================== */

/* Dessa variabler kommer från scriptet men vi override:ar dem här
   för att vara säkra på att de fungerar för f-page-header */
f-page-header {
    /* DESSA är automatiskt genererade i generated-fkui-overrides.scss */
    --f-background-pageheader-primary: var(--my-primary-color) !important;
    --f-color-primary-strong: var(--my-primary-color) !important;
    --f-color-brand-a-medium: var(--my-primary-color) !important;
    --fkds-color-action-background-primary-default: var(
        --my-primary-color
    ) !important;
}

/* Navigation styling med vårt nya variabelsystem */
:deep(.f-navigation-menu) {
    background: var(--my-primary-color) !important;
    padding: var(--my-spacing-sm) !important;
    border-radius: var(--my-border-radius) !important;
    margin: var(--my-spacing-xs) !important;
}

:deep(.f-navigation-menu a) {
    color: white !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    border-radius: var(--my-border-radius) !important;
    padding: var(--my-spacing-xs) var(--my-spacing-sm) !important;
    text-decoration: none !important;
    transition: all 0.2s ease !important;
    background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.f-navigation-menu a:hover) {
    background: rgba(255, 255, 255, 0.2) !important;
    border-color: white !important;
}

/* ========================================
   CUSTOM BUTTON STYLING - MANUELL CSS
   ======================================== */

/* Specifik styling för "öppna detaljpanel"-knappen */
:deep(.button.button--secondary) {
    border-radius: 4px !important; /* Din önskade rundning: 4px */
    background: var(--my-secondary-color) !important;
    color: white !important;
    border: 2px solid var(--my-secondary-color) !important;
    padding: var(--my-spacing-sm) var(--my-spacing-md) !important;
    font-weight: 500 !important;
    transition: all 0.2s ease !important;
}

:deep(.button.button--secondary:hover) {
    background: var(--my-primary-color) !important;
    border-color: var(--my-primary-color) !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
}
</style>
