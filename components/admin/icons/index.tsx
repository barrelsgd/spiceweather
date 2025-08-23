import React from "react";

import plusIconUrl from "./plus.svg";
import closeIconUrl from "./close.svg";
import boxIconUrl from "./box.svg";
import checkCircleIconUrl from "./check-circle.svg";
import alertIconUrl from "./alert.svg";
import infoIconUrl from "./info.svg";
import errorIconUrl from "./info-hexa.svg";
import boltIconUrl from "./bolt.svg";
import arrowUpIconUrl from "./arrow-up.svg";
import arrowDownIconUrl from "./arrow-down.svg";
import folderIconUrl from "./folder.svg";
import videoIconUrl from "./videos.svg";
import audioIconUrl from "./audio.svg";
import gridIconUrl from "./grid.svg";
import fileIconUrl from "./file.svg";
import downloadIconUrl from "./download.svg";
import arrowRightIconUrl from "./arrow-right.svg";
import groupIconUrl from "./group.svg";
import boxIconLineUrl from "./box-line.svg";
import shootingStarIconUrl from "./shooting-star.svg";
import dollarLineIconUrl from "./dollar-line.svg";
import trashBinIconUrl from "./trash.svg";
import angleUpIconUrl from "./angle-up.svg";
import angleDownIconUrl from "./angle-down.svg";
import pencilIconUrl from "./pencil.svg";
import checkLineIconUrl from "./check-line.svg";
import closeLineIconUrl from "./close-line.svg";
import chevronDownIconUrl from "./chevron-down.svg";
import chevronUpIconUrl from "./chevron-up.svg";
import paperPlaneIconUrl from "./paper-plane.svg";
import lockIconUrl from "./lock.svg";
import envelopeIconUrl from "./envelope.svg";
import userIconUrl from "./user-line.svg";
import calenderIconUrl from "./calender-line.svg";
import eyeIconUrl from "./eye.svg";
import eyeCloseIconUrl from "./eye-close.svg";
import timeIconUrl from "./time.svg";
import copyIconUrl from "./copy.svg";
import chevronLeftIconUrl from "./chevron-left.svg";
import userCircleIconUrl from "./user-circle.svg";
import taskIconUrl from "./task-icon.svg";
import listIconUrl from "./list.svg";
import tableIconUrl from "./table.svg";
import pageIconUrl from "./page.svg";
import pieChartIconUrl from "./pie-chart.svg";
import boxCubeIconUrl from "./box-cube.svg";
import plugInIconUrl from "./plug-in.svg";
import docsIconUrl from "./docs.svg";
import mailIconUrl from "./mail-line.svg";
import horizontalDotsUrl from "./horizontal-dots.svg";
import chatIconUrl from "./chat.svg";
import moreDotIconUrl from "./more-dot.svg";
import bellIconUrl from "./bell.svg";

// Generic icon factory that renders an <img> with sensible defaults
type IconProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "children"> & {
  alt?: string; // ensure a meaningful alt is provided per a11y rules
};

const createIcon = (src: string, defaultAlt: string) =>
  React.forwardRef<HTMLImageElement, IconProps>(function Icon(
    { alt, ...props },
    ref
  ) {
    return <img ref={ref} src={src} alt={alt ?? defaultAlt} {...props} />;
  });

const PlusIcon = createIcon(plusIconUrl, "Plus");
const CloseIcon = createIcon(closeIconUrl, "Close");
const BoxIcon = createIcon(boxIconUrl, "Box");
const CheckCircleIcon = createIcon(checkCircleIconUrl, "Success");
const AlertIcon = createIcon(alertIconUrl, "Alert");
const InfoIcon = createIcon(infoIconUrl, "Info");
const ErrorIcon = createIcon(errorIconUrl, "Error");
const BoltIcon = createIcon(boltIconUrl, "Bolt");
const ArrowUpIcon = createIcon(arrowUpIconUrl, "Arrow up");
const ArrowDownIcon = createIcon(arrowDownIconUrl, "Arrow down");
const FolderIcon = createIcon(folderIconUrl, "Folder");
const VideoIcon = createIcon(videoIconUrl, "Video");
const AudioIcon = createIcon(audioIconUrl, "Audio");
const GridIcon = createIcon(gridIconUrl, "Grid");
const FileIcon = createIcon(fileIconUrl, "File");
const DownloadIcon = createIcon(downloadIconUrl, "Download");
const ArrowRightIcon = createIcon(arrowRightIconUrl, "Arrow right");
const GroupIcon = createIcon(groupIconUrl, "Group");
const BoxIconLine = createIcon(boxIconLineUrl, "Box line");
const ShootingStarIcon = createIcon(shootingStarIconUrl, "Shooting star");
const DollarLineIcon = createIcon(dollarLineIconUrl, "Dollar");
const TrashBinIcon = createIcon(trashBinIconUrl, "Trash");
const AngleUpIcon = createIcon(angleUpIconUrl, "Angle up");
const AngleDownIcon = createIcon(angleDownIconUrl, "Angle down");
const PencilIcon = createIcon(pencilIconUrl, "Pencil");
const CheckLineIcon = createIcon(checkLineIconUrl, "Check");
const CloseLineIcon = createIcon(closeLineIconUrl, "Close");
const ChevronDownIcon = createIcon(chevronDownIconUrl, "Chevron down");
const ChevronUpIcon = createIcon(chevronUpIconUrl, "Chevron up");
const PaperPlaneIcon = createIcon(paperPlaneIconUrl, "Paper plane");
const LockIcon = createIcon(lockIconUrl, "Lock");
const EnvelopeIcon = createIcon(envelopeIconUrl, "Envelope");
const UserIcon = createIcon(userIconUrl, "User");
const CalenderIcon = createIcon(calenderIconUrl, "Calendar");
const EyeIcon = createIcon(eyeIconUrl, "Eye");
const EyeCloseIcon = createIcon(eyeCloseIconUrl, "Eye closed");
const TimeIcon = createIcon(timeIconUrl, "Time");
const CopyIcon = createIcon(copyIconUrl, "Copy");
const ChevronLeftIcon = createIcon(chevronLeftIconUrl, "Chevron left");
const UserCircleIcon = createIcon(userCircleIconUrl, "User circle");
const TaskIcon = createIcon(taskIconUrl, "Task");
const ListIcon = createIcon(listIconUrl, "List");
const TableIcon = createIcon(tableIconUrl, "Table");
const PageIcon = createIcon(pageIconUrl, "Page");
const PieChartIcon = createIcon(pieChartIconUrl, "Pie chart");
const BoxCubeIcon = createIcon(boxCubeIconUrl, "Box cube");
const PlugInIcon = createIcon(plugInIconUrl, "Plug in");
const DocsIcon = createIcon(docsIconUrl, "Docs");
const MailIcon = createIcon(mailIconUrl, "Mail");
const HorizontaLDots = createIcon(horizontalDotsUrl, "More options");
const ChatIcon = createIcon(chatIconUrl, "Chat");
const MoreDotIcon = createIcon(moreDotIconUrl, "More");
const BellIcon = createIcon(bellIconUrl, "Notifications");

export {
  DownloadIcon,
  BellIcon,
  MoreDotIcon,
  FileIcon,
  GridIcon,
  AudioIcon,
  VideoIcon,
  BoltIcon,
  PlusIcon,
  BoxIcon,
  CloseIcon,
  CheckCircleIcon,
  AlertIcon,
  InfoIcon,
  ErrorIcon,
  ArrowUpIcon,
  FolderIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  GroupIcon,
  BoxIconLine,
  ShootingStarIcon,
  DollarLineIcon,
  TrashBinIcon,
  AngleUpIcon,
  AngleDownIcon,
  PencilIcon,
  CheckLineIcon,
  CloseLineIcon,
  ChevronDownIcon,
  PaperPlaneIcon,
  EnvelopeIcon,
  LockIcon,
  UserIcon,
  CalenderIcon,
  EyeIcon,
  EyeCloseIcon,
  TimeIcon,
  CopyIcon,
  ChevronLeftIcon,
  UserCircleIcon,
  ListIcon,
  TableIcon,
  PageIcon,
  TaskIcon,
  PieChartIcon,
  BoxCubeIcon,
  PlugInIcon,
  DocsIcon,
  MailIcon,
  HorizontaLDots,
  ChevronUpIcon,
  ChatIcon,
};
