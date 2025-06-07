import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { AnnouncementManagementComponent } from './components/admin/announcement-management/announcement-management.component';
import { CourseManagementComponent } from './components/admin/course-management/course-management.component';
import { HodManagementComponent } from './components/admin/hod-management/hod-management.component';

// HOD Components
import { HodDashboardComponent } from './components/hod/hod-dashboard/hod-dashboard.component';
import { HodLoginComponent } from './components/hod/hod-login/hod-login.component';
import { HodProfileComponent } from './components/hod/hod-profile/hod-profile.component';
import { StudentManagementComponent } from './components/hod/student-management/student-management.component';
import { SubjectManagementComponent } from './components/hod/subject-management/subject-management.component';


// Teacher Components
import { AssignmentManagementComponent } from './components/teacher/assignment-management/assignment-management.component';
import { AttendanceManagementComponent } from './components/teacher/attendance-management/attendance-management.component';
import { ExamManagementComponent } from './components/teacher/exam-management/exam-management.component';
import { ResultManagementComponent } from './components/teacher/result-management/result-management.component';
import { TeacherDashboardComponent } from './components/teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherLoginComponent } from './components/teacher/teacher-login/teacher-login.component';
import { TeacherProfileComponent } from './components/teacher/teacher-profile/teacher-profile.component';

// Student Components
import { StudentDashboardComponent } from './components/student/student-dashboard/student-dashboard.component';
import { StudentLoginComponent } from './components/student/student-login/student-login.component';
import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';

// Shared Components
import { AnnouncementListComponent } from './components/shared/announcement-list/announcement-list.component';
import { AssignmentListComponent } from './components/shared/assignment-list/assignment-list.component';
import { CourseListComponent } from './components/shared/course-list/course-list.component';
import { ResultListComponent } from './components/shared/result-list/result-list.component';
import { SubjectListComponent } from './components/shared/subject-list/subject-list.component';


import { UserLoginComponent } from './user/user-login/user-login.component';

import { AddAdminComponent } from './components/admin/add-admin/add-admin.component';
import { AddCourceComponent } from './components/admin/add-cource/add-cource.component';
import { ManageAdminsComponent } from './components/admin/manage-admins/manage-admins.component';
import { ManageTeachersComponent } from './components/admin/manage-teachers/manage-teachers.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

export const routes: Routes = [
  // Default Route to Login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  
  // Parent Route with Navbar
  {
    path: 'home',
    component: NavbarComponent,
    children: [
      { path: 'admin/add', component: AddAdminComponent },
      { path: 'admin/manage', component: ManageAdminsComponent },
      { path: 'admin/login', component: AdminLoginComponent },
      { path: 'admin/dashboard', component: AdminDashboardComponent },
      { path: 'admin/profile', component: AdminProfileComponent },
      { path: 'admin/hods', component: HodManagementComponent },
      { path: 'admin/courses', component: CourseManagementComponent },
      { path: 'admin/add/courses', component: AddCourceComponent },
      { path: 'admin/manageteacher', component: ManageTeachersComponent },
      
      { path: 'admin/announcements', component: AnnouncementManagementComponent },
    
      // HOD Routes
      { path: 'hod/login', component: HodLoginComponent },
      { path: 'hod/dashboard', component: HodDashboardComponent },
      { path: 'hod/profile', component: HodProfileComponent },
     
      { path: 'hod/students', component: StudentManagementComponent },
      { path: 'hod/subjects', component: SubjectManagementComponent },
    
      // Teacher Routes
      { path: 'teacher/login', component: TeacherLoginComponent },
      { path: 'teacher/dashboard', component: TeacherDashboardComponent },
      
      { path: 'teacher/attendance', component: AttendanceManagementComponent },
      { path: 'teacher/assignments', component: AssignmentManagementComponent },
      {path: 'teacher/exams', component: ExamManagementComponent},
      {path: 'teacher/results', component: ResultManagementComponent},
      {path: 'teacher/profile', component: TeacherProfileComponent},
      

    
      // Student Routes
      { path: 'student/login', component: StudentLoginComponent },
      { path: 'student/dashboard', component: StudentDashboardComponent },
      { path: 'student/profile', component: StudentProfileComponent },
    
      // Shared Routes
      { path: 'subjects', component: SubjectListComponent },
      { path: 'courses', component: CourseListComponent },
      { path: 'announcements', component: AnnouncementListComponent },
      { path: 'assignments', component: AssignmentListComponent },
    
      { path: 'results', component: ResultListComponent },
      { path: 'sidebar', component: SidebarComponent },
    ],
  },

  // Redirect Unknown Routes
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
