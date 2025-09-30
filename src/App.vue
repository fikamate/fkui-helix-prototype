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
   LAYOUT AREAS STYLING (Helix Design System)
   ======================================== */

::part(area header) {
    /* Använd Helix-variabler direkt */
    background: var(--helix-color-surface-primary-default) !important;
    color: var(--helix-color-text-base-white) !important;

    /* FKUI-variabler mappas via bridge till Helix */
    --f-background-pageheader-primary: var(
        --helix-color-surface-primary-default
    ) !important;
    --f-page-layout-color: var(--helix-color-text-base-white) !important;
}

::part(area contextbar) {
    /* Helix Design System */
    --f-page-layout-background: var(
        --helix-color-surface-neutral-default
    ) !important;
    --f-page-layout-color: var(--helix-color-text-neutral-default) !important;
    background: var(--helix-color-surface-neutral-default) !important;
    border-bottom: 2px solid var(--helix-color-border-neutral-default) !important;
}

::part(area toolbar) {
    --f-page-layout-background: var(
        --helix-color-surface-secondary-default
    ) !important;
    --f-page-layout-color: var(--helix-color-text-neutral-default) !important;
    background: var(--helix-color-surface-secondary-default) !important;
    border-bottom: 3px solid var(--helix-color-border-primary-default) !important;
}

::part(area left) {
    --f-page-layout-background: var(
        --helix-color-surface-neutral-subtle
    ) !important;
    --f-page-layout-color: var(--helix-color-text-neutral-default) !important;
    background: var(--helix-color-surface-neutral-subtle) !important;
    border-right: 2px solid var(--helix-color-border-neutral-default) !important;
}

::part(area right) {
    --f-page-layout-background: var(
        --helix-color-surface-neutral-subtle
    ) !important;
    --f-page-layout-color: var(--helix-color-text-neutral-default) !important;
    background: var(--helix-color-surface-neutral-subtle) !important;
    border-left: 2px solid var(--helix-color-border-neutral-default) !important;
}

/* Styling med Helix Design System */
f-page-header,
f-page-header *,
:deep(f-page-header),
:deep(.f-page-header) {
    background: var(--helix-color-surface-primary-default) !important;
    background-color: var(--helix-color-surface-primary-default) !important;
    background-image: linear-gradient(
        135deg,
        var(--helix-color-surface-primary-default),
        var(--helix-color-surface-primary-strong)
    ) !important;
    color: var(--helix-color-text-base-white) !important;
    box-shadow: 0 1px 2px var(--helix-color-shadow-neutral-sm-01),
        0 1px 3px var(--helix-color-shadow-neutral-sm-02) !important;
    padding: var(--helix-spacing-50) !important;
}

/* ========================================
   FKUI KOMPONENTER (Automatiskt från generated-fkui-overrides.scss)
   ======================================== */

/* FKUI-variabler mappade till Helix (dessa mappas automatiskt via bridge) */
f-page-header {
    /* Bridge-systemet mappar dessa automatiskt, men vi kan override för säkerhets skull */
    --f-background-pageheader-primary: var(
        --helix-color-surface-primary-default
    ) !important;
    --f-color-primary-strong: var(
        --helix-color-surface-primary-strong
    ) !important;
    --f-color-brand-a-medium: var(
        --helix-color-surface-primary-default
    ) !important;
    --fkds-color-action-background-primary-default: var(
        --helix-color-surface-primary-default
    ) !important;
}

/* Navigation styling med Helix Design System */
:deep(.f-navigation-menu) {
    background: var(--helix-color-surface-primary-default) !important;
    padding: var(--helix-spacing-30) !important;
    border-radius: 8px !important;
    margin: var(--helix-spacing-20) !important;
}

:deep(.f-navigation-menu a) {
    color: var(--helix-color-text-base-white) !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    border-radius: 6px !important;
    padding: var(--helix-spacing-20) var(--helix-spacing-30) !important;
    text-decoration: none !important;
    transition: all 0.2s ease !important;
    background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.f-navigation-menu a:hover) {
    background: rgba(255, 255, 255, 0.2) !important;
    border-color: var(--helix-color-text-base-white) !important;
}

/* ========================================
   CUSTOM BUTTON STYLING - MANUELL CSS
   ======================================== */

/* Specifik styling för "öppna detaljpanel"-knappen med Helix */
:deep(.button.button--secondary) {
    border-radius: 4px !important; /* Din önskade rundning: 4px */
    background: var(--helix-color-surface-secondary-default) !important;
    color: var(--helix-color-text-base-white) !important;
    border: 2px solid var(--helix-color-border-secondary-default) !important;
    padding: var(--helix-spacing-30) var(--helix-spacing-50) !important;
    font-weight: 500 !important;
    transition: all 0.2s ease !important;
}

:deep(.button.button--secondary:hover) {
    background: var(--helix-color-surface-primary-default) !important;
    border-color: var(--helix-color-border-primary-default) !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 6px var(--helix-color-shadow-neutral-md-01),
        0 2px 4px var(--helix-color-shadow-neutral-md-02) !important;
}
</style>
