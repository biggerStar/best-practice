## 目标文件
源代码编译后，但未进行链接但中间文件,如linux的.o文件与windows的.obj文件。目标文件与可执行文件格式几乎一样，linux中统一成为elf文件。

## elf文件类型
elf文件类型 | 说明 | 实例
---|---|---
可重定位文件(relocatable)|包含数据和代码，被用来链接成为可执行文件或者共享文件|linux的.o文件，windows的.obj文件
可执行文件(executable)| 直接可执行的程序| /bin/bash文件,.exe文件
共享目标文件(shared object)|1、链接器使用它与其他的可重定位文件、共享目标文件，产生新的目标文件。2、动态链接器可以将几个共享目标文件与可执行文件结合，作为进程映像的一部分来运行。| linux的.so文件。windows的DLL
核心转储文件|当进程意外终止时，系统可以将需要保存的内容放到核心转储文件|linux下的core dump文件

- 可以使用file命令查询相应的文件格式

## 目标文件的分段
### .text/.code代码段
存放代码，局部变量
### .data 数据段
存放全局变量和局部静态变量。
> * 静态局部变量：
> * 属于静态存储方式，与源代码段生命周期相同。但是作用与仅限当前函数内部。
### .bss段
存放未经初始化段全局变量静态局部变量

```
int global_init_var = 80; // .data
int global_init_var1;    // .bss
void func1( int i )      // .text
{
  printf("%d\n",i);       //.text
}

int main(void)           //.text
{
  static int static_var=85;  // .data
  static int static_var2;     //.bss
  int a = 1;                //.text
  int b;                    //.text
  func1(static_var + static_var2 + a + b); //.text
  return a;   //.text
}
```
**总体来说，源代码被编译之后，分为两种段：程序指令和程序数据，代码段属于程序指令，数据段和bss段属于程序数据**
程序数据和程序指令分离段好处有：
- 隔离。程序是只读段，数据是可读写段，分离开有利于程序不被异常的修改
- 共享内存。在多进程中，虽然数据不同，但是指令一样，所以内存中只需要保存一份指令，**只读的数据是可以共享的**。不仅包括指令，还有其他只读的数据。这样可以极大的节省空间。 

## SimpleSection.o
编译，-c代表只编译，不链接
```
gcc -c SimpleSection.c
```
使用binutils的工具objdump来查看:
```
objdump -h SimpleSection.o
```
-h 打印主要的信息
```
SimpleSection.o:     file format elf64-x86-64

Sections:
Idx Name          Size      VMA               LMA               File off  Algn
  0 .text         00000054  0000000000000000  0000000000000000  00000040  2**0
                  CONTENTS, ALLOC, LOAD, RELOC, READONLY, CODE
  1 .data         00000008  0000000000000000  0000000000000000  00000094  2**2
                  CONTENTS, ALLOC, LOAD, DATA
  2 .bss          00000004  0000000000000000  0000000000000000  0000009c  2**2
                  ALLOC
  3 .rodata       00000004  0000000000000000  0000000000000000  0000009c  2**0
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  4 .comment      0000002e  0000000000000000  0000000000000000  000000a0  2**0
                  CONTENTS, READONLY
  5 .note.GNU-stack 00000000  0000000000000000  0000000000000000  000000ce  2**0
                  CONTENTS, READONLY
  6 .eh_frame     00000058  0000000000000000  0000000000000000  000000d0  2**3
                  CONTENTS, ALLOC, LOAD, RELOC, READONLY, DATA
```
每段的第二行表示段的各种属性。CONTENTS表示在ELF文件中存在，可以发现bss段在elf中不存在，.bote.GNU-stack（堆栈提示段）虽然有CONTENTS，但是size为0，也可以认为不存在，因此elf中的段:.text,.data,.radata(只读数据段),.comment(注释信息段)，这四个。

size表示各个段的长度，也可以用size命令查看：
```
# size SimpleSection.o
   text	   data	    bss	    dec	    hex	filename
    176	      8	      4	    188	     bc	SimpleSection.o
```
## 代码段
查看SimpleSection.o中的详细信息，-s将所有段的内容打印出来，-d将包含的指令段反汇编

```
## objdump -s -d SimpleSection.o

SimpleSection.o:     file format elf64-x86-64

Contents of section .text:
 0000 554889e5 4883ec10 897dfc8b 45fc89c6  UH..H....}..E...
 0010 bf000000 00b80000 0000e800 000000c9  ................
 0020 c3554889 e54883ec 10c745fc 01000000  .UH..H....E.....
 0030 8b150000 00008b05 00000000 01c28b45  ...............E
 0040 fc01c28b 45f801d0 89c7e800 0000008b  ....E...........
 0050 45fcc9c3                             E...
Contents of section .data:
 0000 50000000 55000000                    P...U...
Contents of section .rodata:
 0000 25640a00                             %d..
Contents of section .comment:
 0000 00474343 3a202847 4e552920 342e382e  .GCC: (GNU) 4.8.
 0010 35203230 31353036 32332028 52656420  5 20150623 (Red
 0020 48617420 342e382e 352d3238 2900      Hat 4.8.5-28).
Contents of section .eh_frame:
 0000 14000000 00000000 017a5200 01781001  .........zR..x..
 0010 1b0c0708 90010000 1c000000 1c000000  ................
 0020 00000000 21000000 00410e10 8602430d  ....!....A....C.
 0030 065c0c07 08000000 1c000000 3c000000  .\..........<...
 0040 00000000 33000000 00410e10 8602430d  ....3....A....C.
 0050 066e0c07 08000000                    .n......

Disassembly of section .text:

0000000000000000 <func1>:
   0:	55                   	push   %rbp
   1:	48 89 e5             	mov    %rsp,%rbp
   4:	48 83 ec 10          	sub    $0x10,%rsp
   8:	89 7d fc             	mov    %edi,-0x4(%rbp)
   b:	8b 45 fc             	mov    -0x4(%rbp),%eax

   e:	89 c6                	mov    %eax,%esi
  10:	bf 00 00 00 00       	mov    $0x0,%edi
  15:	b8 00 00 00 00       	mov    $0x0,%eax
  1a:	e8 00 00 00 00       	callq  1f <func1+0x1f>
  1f:	c9                   	leaveq
  20:	c3                   	retq

0000000000000021 <main>:
  21:	55                   	push   %rbp
  22:	48 89 e5             	mov    %rsp,%rbp
  25:	48 83 ec 10          	sub    $0x10,%rsp
  29:	c7 45 fc 01 00 00 00 	movl   $0x1,-0x4(%rbp)
  30:	8b 15 00 00 00 00    	mov    0x0(%rip),%edx        # 36 <main+0x15>
  36:	8b 05 00 00 00 00    	mov    0x0(%rip),%eax        # 3c <main+0x1b>
  3c:	01 c2                	add    %eax,%edx
  3e:	8b 45 fc             	mov    -0x4(%rbp),%eax
  41:	01 c2                	add    %eax,%edx
  43:	8b 45 f8             	mov    -0x8(%rbp),%eax
  46:	01 d0                	add    %edx,%eax
  48:	89 c7                	mov    %eax,%edi
  4a:	e8 00 00 00 00       	callq  4f <main+0x2e>
  4f:	8b 45 fc             	mov    -0x4(%rbp),%eax
  52:	c9                   	leaveq
  53:	c3                   	retq
```
## 数据段和只读数据段
.data数据段，存放全局静态变量和局部静态变量
.rodata存放只读数据，一般是只读变量(const)和字符串常量。
```
Contents of section .data:
 0000 50000000 55000000                    P...U...
Contents of section .rodata:
 0000 25640a00                             %d..
```

## ELF文件结构描述
ELF文件结构|
---|
ELF Header |
.text|
.data|
.bss|
other sections|
section header table|
String tables Symbol tables|

