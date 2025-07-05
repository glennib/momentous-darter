{
  pkgs ? import <nixpkgs> {},
}:
pkgs.mkShell {
  name = "momentous-darter";
  packages = with pkgs; [
    nodejs_24
	pnpm_9
	flyctl
	sqlfluff
  ];
}
