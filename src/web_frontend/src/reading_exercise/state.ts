export type ItemResult = "done" | "failed";
export type ItemDisplayStatus = ItemResult | "current" | "pending";
export type ActivityDisplayStatus = "done" | "current" | "locked";

export interface LessonState {
  screen: "lesson" | "activity" | "done";
  currentActivity: number;
  currentItem: number;
  itemResults: Record<number, Record<number, ItemResult>>;
  completedActivities: Set<number>;
}

export function itemStatus(
  activityIdx: number,
  itemIdx: number,
  state: LessonState
): ItemDisplayStatus {
  const { currentActivity, currentItem, itemResults, completedActivities } = state;
  if (completedActivities.has(activityIdx)) {
    const res = itemResults[activityIdx];
    if (res && res[itemIdx] !== undefined) return res[itemIdx];
    return "done";
  }
  if (activityIdx < currentActivity) return "done";
  if (activityIdx > currentActivity) return "pending";
  const res = itemResults[activityIdx] || {};
  if (res[itemIdx] !== undefined) return res[itemIdx];
  if (itemIdx === currentItem) return "current";
  return "pending";
}

export function activityStatus(idx: number, state: LessonState): ActivityDisplayStatus {
  if (state.completedActivities.has(idx)) return "done";
  if (state.currentActivity === idx) return "current";
  if (idx < state.currentActivity) return "done";
  return "locked";
}
