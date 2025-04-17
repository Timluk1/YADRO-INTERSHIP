import { IFiltersState } from "@/core/Filters/FiltersSlice";

class FiltersStorage {
    private readonly key = "filters";

    save(filters: IFiltersState) {
        localStorage.setItem(this.key, JSON.stringify(filters));
    }

    load(): IFiltersState {
        const data = localStorage.getItem(this.key);
        if (!data) {
            return { status: "all", date: "all", priority: "all" };
        }

        try {
            return JSON.parse(data) as IFiltersState;
        } catch {
            return { status: "all", date: "all", priority: "all" };
        }
    }
}

export const filtersStorage = new FiltersStorage();
