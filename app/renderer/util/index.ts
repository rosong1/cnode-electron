import { object } from 'prop-types';

export const fixImgUrl = (url: string): string => {
    return url.indexOf('http') !== -1
        ? url
        : `https:${url}`
}

export const classNames = (config: object): string => {
    const tempArr = []
    for (const key in config) {
        if (object.hasOwnProperty(key)) {
            config[key] && tempArr.push(key)
        }
    }
    return tempArr.join(' ')
}