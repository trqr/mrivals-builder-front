export const parseCustomTags = (str: string)  => {
    return str
        .replace(/<Orange>(.*?)<\/>/g, '<span style="color: orange;">$1</span>')
        .replace(/<Buff>(.*?)<\/>/g, '<span style="color: limegreen;">$1</span>')
        .replace(/<Debuff>(.*?)<\/>/g, '<span style="color: darkviolet;">$1</span>')
        .replace(/\{Ability2\}/g, '<kbd>Shift</kbd>')
        .replace(/\{Jump\}/g, '<kbd>Space</kbd>')
        .replace(/\{104700}/g, '<span>Jeff</span>')
        .replace(/\{102300}/g, '<span>Rocket</span>')
        .replace(/\{000003}/g, '<span> and </span>')
}