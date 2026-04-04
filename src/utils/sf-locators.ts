/**
 * Salesforce Lightning component locator builders
 * DRY — centralized locator patterns to avoid string duplication across page objects
 */

export const SFLocators = {
  /** Lightning combobox dropdown trigger button */
  dropdownButton: (ariaLabel: string) => `//button[@aria-label='${ariaLabel}']`,

  /** Lightning combobox dropdown item by value */
  dropdownItem: (value: string) => `//lightning-base-combobox-item[@data-value='${value}']`,

  /** Lightning lookup search input field */
  lookupInput: (placeholder: string) => `[placeholder='${placeholder}']`,

  /** Lightning lookup result option by title */
  lookupOption: (title: string) =>
    `//lightning-base-combobox-formatted-text[@title='${title}']`,

  /** Lightning formatted text (used for record names like Account name) */
  formattedText: (text: string) => `//lightning-formatted-text[text()='${text}']`,

  /** Lightning formatted name (used for Contact full name display) */
  formattedName: (fullName: string) => `//lightning-formatted-name[text()='${fullName}']`,

  /** App Launcher waffle button */
  appLauncher: () => "//div[contains(@class,'appLauncher')]",

  /** App Launcher search input */
  appLauncherSearch: () => "[placeholder='Search apps and items...']",

  /** App Launcher result link by data-label */
  appLauncherResult: (label: string) => `[data-label='${label}']`,

  /** Standard 'New' record button on list views */
  newButton: () => "//a[@title='New']",

  /** Save/Edit button on record forms */
  saveButton: () => "[name='SaveEdit']",

  /** Global search button */
  globalSearchButton: () => "button[aria-label='Search']",

  /** List view search bar */
  listViewSearch: () => "[placeholder='Search this list...']",
} as const;
