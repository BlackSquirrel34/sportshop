import { HelperOptions }  from "handlebars";
import { stringify } from "querystring";
import { escape } from "querystring";

const getData = (options:HelperOptions) => {
     return {...options.data.root, ...options.hash}
};
export const navigationUrl = (options: HelperOptions) => {
    const { page, pageSize, category, searchTerm } = getData(options);
    return "/?" + stringify({ page, pageSize, category, searchTerm  });
}
export const escapeUrl = (url: string) => escape(url);
export const pageButtons = (options: HelperOptions) => {
    const { page, pageCount } = getData(options);
    let output = "";
    for (let i = 1; i <= pageCount; i++) {
        output += options.fn({
            page, pageCount, index: i, selected: i === page
        });
    }
    return output;
}
// user can select 3, 6, or 9 items per page
export const pageSizeOptions = (options: HelperOptions) => {
    const { pageSize } = getData(options);
    let output = "";
    [3, 6, 9].forEach(size => {
        output += options.fn({ size,
            selected: pageSize === size ? "selected": ""})
    })
    return output;
} 
// support filtering
export const categoryButtons = (options: HelperOptions) => {
    const { category, categories } = getData(options);
    let output = "";
    for (let i = 0; i < categories.length; i++) {
        output += options.fn({
            id: categories[i].id,
            name: categories[i].name,
            selected: category === categories[i].id
        })
    }
    return output;
}