export type LibaryWord = {
  speach: string;
  displayText: string;
  displayEmoji: string;
};
export type Libarycategories = {
  titleEmoji: string;
  titleText: string;

  words: LibaryWord[];
};
export type LibaryData = {
  categories: Libarycategories[];
};

class Libary {
  data: LibaryData;
  private libraryKey: string = "open_aac";

  constructor() {
    const tempData = this.load();
    if (tempData === undefined) {
      this.data = this.returnDefaultData();
      this.save();
    } else {
      this.data = tempData;
    }
  }

  returnDefaultData() {
    const data: LibaryData = {
      categories: [
        {
          titleEmoji: "👨‍👩‍👧‍👦",
          titleText: "Family",
          words: [
            { speach: "mom", displayText: "Mom", displayEmoji: "👩❤️👶" },
            { speach: "dad", displayText: "Dad", displayEmoji: "👨❤️👶" },
            { speach: "brother", displayText: "Brother", displayEmoji: "👦👫" },
            { speach: "sister", displayText: "Sister", displayEmoji: "👧👫" },
            { speach: "family", displayText: "Family", displayEmoji: "👨‍👩‍👧‍👦❤️" },
          ],
        },
        {
          titleEmoji: "🍽️",
          titleText: "Food & Drink",
          words: [
            { speach: "water", displayText: "Water", displayEmoji: "💧🥛" },
            { speach: "food", displayText: "Food", displayEmoji: "🍽️🍲" },
            { speach: "eat", displayText: "Eat", displayEmoji: "🍴🍲" },
            { speach: "drink", displayText: "Drink", displayEmoji: "🥤🍹" },
            { speach: "apple", displayText: "Apple", displayEmoji: "🍎🍏" },
            { speach: "banana", displayText: "Banana", displayEmoji: "🍌👋" },
            { speach: "water", displayText: "Water", displayEmoji: "💧🥛" },
            { speach: "food", displayText: "Food", displayEmoji: "🍽️🍲" },
            { speach: "eat", displayText: "Eat", displayEmoji: "🍴🍲" },
            { speach: "drink", displayText: "Drink", displayEmoji: "🥤🍹" },
            { speach: "apple", displayText: "Apple", displayEmoji: "🍎🍏" },
            { speach: "banana", displayText: "Banana", displayEmoji: "🍌👋" },
          ],
        },
        {
          titleEmoji: "❤️",
          titleText: "Feelings",
          words: [
            { speach: "happy", displayText: "Happy", displayEmoji: "😊❤️✨" },
            { speach: "sad", displayText: "Sad", displayEmoji: "😢💧" },
            { speach: "angry", displayText: "Angry", displayEmoji: "😠🔥" },
            {
              speach: "excited",
              displayText: "Excited",
              displayEmoji: "😃🎉✨",
            },
            { speach: "tired", displayText: "Tired", displayEmoji: "😴💤" },
          ],
        },
        {
          titleEmoji: "🚻",
          titleText: "Needs",
          words: [
            {
              speach: "bathroom",
              displayText: "Bathroom",
              displayEmoji: "🚻🚪",
            },
            { speach: "help", displayText: "Help", displayEmoji: "🆘🙋‍♂️🙋‍♀️" },
            { speach: "please", displayText: "Please", displayEmoji: "🙏😊" },
            {
              speach: "thank you",
              displayText: "Thank you",
              displayEmoji: "😊🙏✨",
            },
          ],
        },
        {
          titleEmoji: "💬",
          titleText: "Phrases",
          words: [
            {
              speach: "I need help",
              displayText: "I need help",
              displayEmoji: "🆘🙋‍♂️🙋‍♀️",
            },
            {
              speach: "I am hungry",
              displayText: "I am hungry",
              displayEmoji: "🍽️😋",
            },
            {
              speach: "I am thirsty",
              displayText: "I am thirsty",
              displayEmoji: "🥤💧",
            },
            {
              speach: "I need the bathroom",
              displayText: "I need the bathroom",
              displayEmoji: "🚻🚪💧",
            },
            {
              speach: "I am tired",
              displayText: "I am tired",
              displayEmoji: "😴💤",
            },
          ],
        },
      ],
    };
    return data;
  }

  save(): void {
    localStorage.setItem(this.libraryKey, JSON.stringify(this.data));
  } // Load library data from localStorage

  load(): LibaryData | undefined {
    const savedData = localStorage.getItem(this.libraryKey);
    if (savedData) {
      const tempData = JSON.parse(savedData) as LibaryData;
      this.data = tempData;
      return tempData;
    }
  } // Add a new category

  addCategory(titleText: string, titleEmoji: string): void {
    const newCategory: Libarycategories = {
      titleText,
      titleEmoji,
      words: [],
    };
    this.data.categories.push(newCategory);
    this.save();
  } // Add a new word to a specified category by title

  addWordToCategory(
    categoryTitle: string,
    speach: string,
    displayText: string,
    displayEmoji: string
  ): boolean {
    const category = this.data.categories.find(
      (cat) => cat.titleText === categoryTitle
    );

    if (!category) {
      console.error(`Category "${categoryTitle}" not found`);
      return false;
    }

    const newWord: LibaryWord = { speach, displayText, displayEmoji };
    category.words.push(newWord);
    this.save();
    return true;
  } // Get current library data

  getData(): LibaryData {
    return this.data;
  } // Clear library data from both memory and localStorage

  clearData(): void {
    this.data = { categories: [] };
    localStorage.removeItem(this.libraryKey);
  }
}
const libary = new Libary();
export const getLibary = () => {
  return libary;
};
