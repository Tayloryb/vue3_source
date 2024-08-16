// import { createApp, ref, Ref, App } from 'vue'
// import ParentTaskInfo from './taskviews/ParentTaskInfo.vue';
// import { TaskInfo } from './taskviews/define';

// interface ParentTaskInfoProps {
//   data: TaskInfo
//   parent: TaskInfo
//   getPopupContainer: () => HTMLElement
//   prefix: string
// }

// interface ParentTaskMap {
//   visible: Ref<boolean>
//   data: TaskInfo
//   getPopupContainer: () => HTMLElement
//   component: App<Element> | null;

// }

// export const useManageParentTask = () => {
//   const parentTaskMap = ref<Map<string, ParentTaskMap>>(new Map())
//   const currentTask = ref<string>('')

//   type ComponentProps = InstanceType<typeof ParentTaskInfo>['$props']

//   const showParentTask = (info: ParentTaskInfoProps) => {
//     const { prefix, data, getPopupContainer, parent } = info
//     const uuid = `${prefix}-${data.id}`
//     const parentTask = parentTaskMap.value.get(uuid)
//     if (parentTask) {
//       if (!parentTask.visible || typeof parentTask.visible.value === 'undefined') {
//         console.error('parentTask.visible is not a ref', parentTask);
//         return;
//       }
//       parentTask.visible.value = true;
//       return;
//     } else {
//       const parentTask: ParentTaskMap = {
//         visible: ref(true),
//         data,
//         getPopupContainer,
//         component: null
//       }
//       parentTaskMap.value.set(uuid, parentTask)
//       const params: ComponentProps = {
//         key: uuid,
//         data: parent,
//         visible: parentTask.visible,
//         getPopupContainer: parentTask.getPopupContainer,
//       }
//       parentTask.component = addParentTask(params)
//     }
//     currentTask.value = uuid
//   }
//   const addParentTask = (props: ComponentProps): App<Element> => {
//     const container = document.createElement('div');
//     document.body.appendChild(container);
//     const app = createApp(ParentTaskInfo, {
//       ...props,
//       visible: props.visible,
//       onClose: () => {
//         props.visible.value = false;
//       }
//     });
//     app.mount(container);
//     return app;
//   }
//   return {
//     addParentTask,
//     showParentTask
//   }
// }

