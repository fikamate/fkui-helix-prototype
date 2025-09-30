<script setup lang="ts">
import { type NavigationMenuItem, FNavigationMenu } from "@fkui/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const bar1: NavigationMenuItem[] = [
    { label: "Översikt", route: "overview" },
    { label: "Journal", route: "journal" },
    { label: "Dokument", route: "documents" },
];

const bar2: NavigationMenuItem[] = [
    { label: "Kundinformation", route: "ROUTE_1" },
    { label: "Kundens ärenden", route: "ROUTE_2" },
    { label: "Serviceåtgärder", route: "ROUTE_3" },
];

function onSelectRoute(route: string): void {
    router.push({ name: route });
}
</script>

<template>
    <div class="custom-toolbar">
        <f-navigation-menu
            aria-label="Primary toolbar"
            class="primary-nav"
            :routes="bar1"
            @selected-route="onSelectRoute"
        />
        <f-navigation-menu
            aria-label="Secondary toolbar"
            class="secondary-nav"
            :routes="bar2"
        />
    </div>
</template>

<style scoped>
.custom-toolbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background: var(--color-surface);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--spacing-md);
}

.primary-nav {
    /* Override FKUI styles med dina designvariabler */
    --f-nav-background: var(--brand-primary);
    --f-nav-text-color: white;
    border-radius: var(--border-radius-sm);
}

.secondary-nav {
    --f-nav-background: var(--color-background);
    --f-nav-text-color: var(--color-text-secondary);
    --f-nav-active-color: var(--brand-accent);
    border: 1px solid var(--color-text-secondary);
    border-radius: var(--border-radius-sm);
}

/* Hover states med dina variabler */
.custom-toolbar :deep(.f-navigation-menu-item:hover) {
    background-color: var(--brand-secondary);
    color: white;
    transition: all 0.2s ease-in-out;
}
</style>
