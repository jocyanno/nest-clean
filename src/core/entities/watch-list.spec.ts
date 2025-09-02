import { WatchedList } from './watched-list';

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b;
  }
}

describe('watched list', () => {
  it('should be able to create a watched list with initial items', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    expect(list.currentItems).toHaveLength(3);
  });

  it('should be able to add new items to the watched list', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.add(4);

    expect(list.currentItems).toHaveLength(4);
    expect(list.getNewItems()).toEqual([4]);
  });

  it('should be able to remove items from the watched list', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(2);

    expect(list.currentItems).toHaveLength(2);
    expect(list.getRemovedItems()).toEqual([2]);
  });

  it('should be able to add an item even if it was removed from the list', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(2);
    list.add(2);

    expect(list.currentItems).toHaveLength(3);
    expect(list.getNewItems()).toEqual([]);
    expect(list.getRemovedItems()).toEqual([]);
  });

  it('should be able to remove an item even if it was added to the list before', () => {
    const list = new NumberWatchedList([1, 2, 3]);
    list.add(4);
    list.remove(4);

    expect(list.currentItems).toHaveLength(3);
    expect(list.getNewItems()).toEqual([]);
    expect(list.getRemovedItems()).toEqual([]);
  });

  it('should be able to update items in the watched list', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.update([1, 3, 4]);

    expect(list.currentItems).toHaveLength(3);

    expect(list.getNewItems()).toEqual([4]);
    expect(list.getRemovedItems()).toEqual([2]);
  });

  it('should be able to keep the same items in the watched list', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.update([1, 2, 3]);

    expect(list.currentItems).toHaveLength(3);
  });
});
